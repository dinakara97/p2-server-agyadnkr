const { Bookmark, Movie, Genre, User } = require("../models");

class BookmarkController {
  static async addToBookmark(req, res, next) {
    try {
      const { id: movieId } = req.params;
      const { id: userId } = req.user;

      const [bookmark, created] = await Bookmark.findOrCreate({
        where: {
          movieId,
          userId
        }
      })
      // console.log(created);
      // console.log(bookmark.dataValues);
      if (!created) {
        throw { name: 'AlreadyOnBookmark' }
      }
      res.status(201).json({
        id: bookmark.dataValues.id,
        movieId: bookmark.dataValues.movieId,
        userId: bookmark.dataValues.userId,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBookmark(req, res, next) {
    try {
      const { id: userId } = req.user;
      const result = await User.findByPk(userId, {
        attributes: ["id", "username", "email"],
        include: [
          {
            model: Movie,
            where: {
              status: "Active"
            },
            through: {
              attributes: []
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "status"],
            },
            include: [
              {
                model: Genre,
                attributes: ["id", "name"],
              },
            ],
            exclude: [
              {
                model: Bookmark,
              },
            ],
          },
        ],
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookmarkController;
