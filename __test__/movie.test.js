const app = require("../app");
const { User, sequelize } = require("../models");
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

let token1, token2;

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

describe("GET /public/movies", () => {
  test("200 success get movies", 
  (done) => {
    request(app)
      .get("/public/movies")
      .set("access_token", token1)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body.rows)).toBeTruthy();
        expect(body.rows.length).toBeGreaterThan(0);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(body).toHaveProperty("rows", expect.any(Array));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get movies without access token", 
  (done) => {
    request(app)
      .get("/public/movies")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body.rows)).toBeTruthy();
        expect(body.rows.length).toBeGreaterThan(0);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(body).toHaveProperty("rows", expect.any(Array));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get movies with pagination", 
  (done) => {
    request(app)
      .get("/public/movies")
      .query({ page: 2 })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body.rows)).toBeTruthy();
        expect(body.rows.length).toBe(8);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(body).toHaveProperty("rows", expect.any(Array));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get movies with movie per page filter", 
  (done) => {
    request(app)
      .get("/public/movies")
      .query({ per_page: 12 })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body.rows)).toBeTruthy();
        expect(body.rows.length).toBe(12);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(body).toHaveProperty("rows", expect.any(Array));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get movies with genre filter", 
  (done) => {
    request(app)
      .get("/public/movies")
      .query({ genre: 1 })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body.rows)).toBeTruthy();
        expect(body.rows.length).toBeGreaterThan(0);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(body).toHaveProperty("rows", expect.any(Array));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get movies with search filter", 
  (done) => {
    request(app)
      .get("/public/movies")
      .query({ search: "the fast" })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body.rows)).toBeTruthy();
        expect(body.rows.length).toBeGreaterThan(0);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(body).toHaveProperty("rows", expect.any(Array));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get movies with sort by rating", 
  (done) => {
    request(app)
      .get("/public/movies")
      .query({ search: "the fast" })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body.rows)).toBeTruthy();
        expect(body.rows.length).toBeGreaterThan(0);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(body).toHaveProperty("rows", expect.any(Array));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get movies with genre and search filter", 
  (done) => {
    request(app)
      .get("/public/movies")
      .query({
        search: "the",
        genre: 1,
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body.rows)).toBeTruthy();
        expect(body.rows.length).toBeGreaterThan(0);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(body).toHaveProperty("rows", expect.any(Array));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get movies with all filter and sort by title", 
  (done) => {
    request(app)
      .get("/public/movies")
      .query({
        per_page: 3,
        search: "the",
        genre: 1,
        sort: "titleDesc",
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body.rows)).toBeTruthy();
        expect(body.rows.length).toBe(3);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(body).toHaveProperty("rows", expect.any(Array));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get movies with all filter and sort by title without access token", 
  (done) => {
    request(app)
      .get("/public/movies")
      .query({
        per_page: 3,
        search: "the",
        genre: 1,
        sort: "titleDesc",
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body.rows)).toBeTruthy();
        expect(body.rows.length).toBe(3);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(body).toHaveProperty("rows", expect.any(Array));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /public/movies/:id", () => {
  test("200 success get movies with id 10", 
  (done) => {
    request(app)
      .get("/public/movies/2")
      .set("access_token", token1)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("id", 2);
        expect(body).toHaveProperty("title", expect.any(String));
        expect(body).toHaveProperty("synopsis", expect.any(String));
        expect(body).toHaveProperty("trailerUrl", expect.any(String));
        expect(body).toHaveProperty("imgUrl", expect.any(String));
        expect(body).toHaveProperty("rating", expect.any(Number));
        expect(body).toHaveProperty("status", expect.any(String));
        expect(body).toHaveProperty("authorId", expect.any(Number));
        expect(body).toHaveProperty("genreId", expect.any(Number));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get movies with id 2 without access token", 
  (done) => {
    request(app)
      .get("/public/movies/2")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("id", 2);
        expect(body).toHaveProperty("title", expect.any(String));
        expect(body).toHaveProperty("synopsis", expect.any(String));
        expect(body).toHaveProperty("trailerUrl", expect.any(String));
        expect(body).toHaveProperty("imgUrl", expect.any(String));
        expect(body).toHaveProperty("rating", expect.any(Number));
        expect(body).toHaveProperty("status", expect.any(String));
        expect(body).toHaveProperty("authorId", expect.any(Number));
        expect(body).toHaveProperty("genreId", expect.any(Number));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed get movies when the id not exist in database", 
  (done) => {
    request(app)
      .get("/public/movies/2000")
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
});
