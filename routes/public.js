const publicRouter = require('express').Router()
const MovieController = require('../controllers/movie')
const UserController = require('../controllers/user')
const customerAuthentication = require("../middlewares/customerAuthentication")
const BookmarkController = require('../controllers/bookmark')
const GenreController = require('../controllers/genre')

publicRouter.post('/register', UserController.createPublicAccount)
publicRouter.post('/login', UserController.login)
publicRouter.post('/login-google', UserController.loginGooglePublic)

publicRouter.get('/movies', MovieController.getMoviesPublic)
publicRouter.get('/movies/:id', MovieController.moviesById)

publicRouter.get('/genres', GenreController.getGenres)

publicRouter.use(customerAuthentication)

publicRouter.post('/movies/:id', BookmarkController.addToBookmark)
publicRouter.get('/bookmarks', BookmarkController.getBookmark)

module.exports = publicRouter;