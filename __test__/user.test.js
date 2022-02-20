const app = require('../app');
const { sequelize } = require('../models');
const request = require('supertest');
const { queryInterface } = sequelize;

afterAll(done => {
  queryInterface
    .bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe("User Test", () => {
  describe("POST /public/register - create new user", () => {
    test("201 register success - should create new user", 
    (done) => {
      request(app)
        .post('/public/register')
        .send({
          email: "test5@mail.com",
          password: "12345678"
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('email', "test5@mail.com");
          expect(body).toHaveProperty('role', "Customer");
          done();
      })
      .catch((err) => {
        done(err)
      })
    })

    test("400 Failed register - should return error if email already exist", 
    (done) => {
      request(app)
        .post('/public/register')
        .send({
          email: "test5@mail.com",
          password: "12345678"
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Email address already in use!!');
          done();
        })
        .catch((err) => {
          done(err)
        })
    })

    test("400 Failed register - should return error if email is null", 
    (done) => {
      request(app)
        .post('/public/register')
        .send({
          password: "12345678"
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Email is required');
          done();
        })
        .catch((err) => {
          done(err)
        })
    })

    test("400 Failed register - should return error if password is null", 
    (done) => {
      request(app)
        .post('/public/register')
        .send({
          email: "test5@mail.com"
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Password is required');
          done();
        })
        .catch((err) => {
          done(err)
        })
    })

    test("400 Failed register - should return error if email is empty", 
    (done) => {
      request(app)
        .post('/public/register')
        .send({
          email: "",
          password: "12345678"
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Email is required');
          done();
        })
        .catch((err) => {
          done(err)
        })
    })

    test("400 Failed register - should return error if password is empty", 
    (done) => {
      request(app)
        .post('/public/register')
        .send({
          email: "test5@mail.com",
          password: ""
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Password is required');
          done();
        })
        .catch((err) => {
          done(err)
        })
    })

    test("400 Failed register - should return error if email format is invalid", 
    (done) => {
      request(app)
        .post('/public/register')
        .send({
          email: "test5mailcom",
          password: "12345678"
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Email Format is invalid!');
          done();
        })
        .catch((err) => {
          done(err)
        })
    })

    test("400 Failed register - should return error if password length less than 5 characters long", 
    (done) => {
      request(app)
        .post('/public/register')
        .send({
          email: "test1@mail.com",
          password: "1234"
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Password should be 5 to 24 characters long');
          done();
        })
        .catch((err) => {
          done(err)
        })
    })

    test("400 Failed register - should return error if password length more than 24 characters long", 
    (done) => {
      request(app)
        .post('/public/register')
        .send({
          email: "test1@mail.com",
          password: "12344234342353523532535fdsfsdfdsfsdfsdfcfsf"
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Password should be 5 to 24 characters long');
          done();
        })
        .catch((err) => {
          done(err)
        })
    })
  })

  describe("POST /public/login - Login user", () => {
    test('200 login success - should access_token, id, role, and email', 
    done => {
      request(app)
        .post('/public/login')
        .send({
          email: "test5@mail.com",
          password: "12345678"
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty('access_token', expect.any(String));
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('email', "test5@mail.com");
          expect(body).toHaveProperty('role', "Customer");
          done();
        })
        .catch(err => {
          done(err)
        })
    })

    test('400 login failed - should return error when password is invalid', 
    done => {
      request(app)
        .post('/public/login')
        .send({
          email: "test5@mail.com",
          password: "1234"
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Invalid Email/Password');
          done();
        })
        .catch(err => {
          done(err)
        })
    })

    test('400 login failed - should return error when email is not registered', 
    done => {
      request(app)
        .post('/public/login')
        .send({
          email: "not_registered@mail.com",
          password: "12345678"
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Invalid Email/Password');
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  })
})