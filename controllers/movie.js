const { Movie, Genre, User, History } = require("../models");
const { Op } = require("sequelize");
const titleCase = require("../helpers/titleCase");
const convertToMovieTitleCase = require("../helpers/convertToMovieTitleCase");

class MovieController {
  static async getMovies(req, res, next) {
    try {
      const result = await Movie.findAll({
        where: {
          [Op.or]: [{ status: "Active" }, { status: "Inactive" }],
        },
        order: [["updatedAt", "DESC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Genre,
            attributes: ["name", "id"],
          },
          {
            model: User,
            attributes: ["username", "email", "role"],
          },
        ],
      });
      res.status(200).json(result);
    } catch (error) {
      // res.status(500).json(error)
      next(error);
    }
  }

  static async getMoviesPublic(req, res, next) {
    try {
      const { per_page, page, genre, sort, search } = req.query;

      const query = {
        where: {
          [Op.or]: [{ status: "Active" }, { status: "Inactive" }],
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Genre,
            attributes: ["name", "id"],
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        limit: per_page ? per_page : 8,
        offset: ((page ? page : 1) - 1) * (per_page ? per_page : 8),
      };

      if (genre) {
        query.where.genreId = {
          [Op.eq]: genre,
        };
      }

      if (sort) {
        switch (sort) {
          case "rating":
            query.order = [["rating", "DESC"]];
            break;
          case "latest":
            query.order = [["createdAt", "DESC"]];
            break;
          case "titleDesc":
            query.order = [["title", "DESC"]];
            break;
          case "titleAsc":
            query.order = [["title", "ASC"]];
            break;
        }
      }

      if (search) {
        query.where.title = {
          [Op.or]: [
            {
              [Op.substring]: search,
            },
            {
              [Op.substring]: search.toUpperCase()
            },
            {
              [Op.substring]: search.toLowerCase()
            },
            {
              [Op.substring]: titleCase(search)
            },
            {
              [Op.substring]: convertToMovieTitleCase(search)
            },
          ],
        };
      }

      const result = await Movie.findAndCountAll(query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async moviesById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Movie.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Genre,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: ["username", "email", "role"],
          },
        ],
      });

      if (!result) {
        throw { name: "NotFound" };
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async createMovies(req, res, next) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const authorId = req.user.id;
      const result = await Movie.create({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId,
      });
      // res.status(200).json(result)

      const history = await History.create({
        name: result.title,
        description: `New entity with id ${result.id} created`,
        updatedBy: req.user.id,
      });
      res.status(201).json(result);
    } catch (error) {
      // res.status(500).json(error)
      next(error);
    }
  }

  static async editMovies(req, res, next) {
    try {
      const { id } = req.params;
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId } =
        req.body;

      const findMovie = await Movie.findByPk(id);
      if (!findMovie) {
        throw { name: "NotFound" };
      }

      const result = await Movie.update(
        {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
          authorId,
        },
        {
          where: { id },
          returning: true,
        }
      );

      // res.status(200).json(result[1][0])

      const history = await History.create({
        name: result[1][0].title,
        description: `Entity with id ${result[1][0].id} updated`,
        updatedBy: req.user.id,
      });

      res.status(200).json(result[1][0]);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMovies(req, res, next) {
    try {
      const { id } = req.params;

      const result = await Movie.destroy({ where: { id } });
      res.status(200).json({ message: "Movie deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);
      const status = titleCase(req.body.status);

      if (!movie) {
        throw { name: "NotFound" };
      }

      const result = await Movie.update(
        {
          status,
        },
        {
          where: { id },
          returning: true,
        }
      );

      const history = await History.create({
        name: result[1][0].title,
        description: `Product with id ${result[1][0].id} status has been updated from ${movie.status} into ${result[1][0].status}`,
        updatedBy: req.user.id,
      });

      res.status(200).json(result[1][0]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
