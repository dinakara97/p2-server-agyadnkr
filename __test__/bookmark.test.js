const app = require("../app");
const { User, Bookmark, sequelize } = require("../models");
const request = require("supertest");
const { queryInterface } = sequelize;
const { createToken } = require("../helpers/jwt");

const user = {
  email: "test1@mail.com",
  password: "12345678",
  role: "Customer"
};

const genreData = require("../data/genres.json");
const movieData = require("../data/movies.json");

beforeAll((done) => {
  User.create(user)
    .then((Response) => {
      token1 = createToken(
        {
          id: Response.id,
          email: Response.email,
          role: Response.role,
        },
        "inisangatrahasia"
      );

      genreData.forEach((el) => {
        delete el.id;
        el.createdAt = new Date();
        el.updatedAt = new Date();
      });

      return queryInterface.bulkInsert("Genres", genreData);
    })
    .then(() => {
      movieData.forEach((el) => {
        delete el.id;
        el.createdAt = new Date();
        el.updatedAt = new Date();
      });

      return queryInterface.bulkInsert("Movies", movieData);
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    })
    .then(() => {
      return queryInterface.bulkDelete("Genres", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then(() => {
      return queryInterface.bulkDelete("Movies", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("POST /public/movies/:id", () => {
  test("201 success add to bookmark", 
  (done) => {
    request(app)
      .get("/public/movies/11")
      .set("access_token", token1)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(201);
        expect(body).toHaveProperty("movieId", expect.any(Number));
        expect(body).toHaveProperty("userId", expect.any(Number));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed to add movie that doesn't exist", 
  (done) => {
    request(app)
      .get("/public/movies/2100")
      .set("access_token", token1)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 failed to add movie if no access token", 
  (done) => {
    request(app)
      .get("/public/movies/2")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

});

describe("GET /public/movies/:id", () => {
  test("200 success get bookmark", 
  (done) => {
    request(app)
      .get("/public/bookmarks")
      .set("access_token", token1)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body.Movies.length).toBeGreaterThan(0);
        expect(body).toHaveProperty("id", expect.any(Number));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});