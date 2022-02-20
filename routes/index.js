const indexRouter = require('express').Router()
const UserController = require('../controllers/user')
const HistoryController = require('../controllers/history')
const authentication = require('../middlewares/authentication')

const movieRouter = require('./movie')
const publicRouter = require('./public')
const genreRouter = require('./genre')
const historyRouter = require('./history')


indexRouter.post('/login', UserController.login)
indexRouter.post('/login-google', UserController.loginGoogle)
indexRouter.post('/register', UserController.createAccount)

indexRouter.use('/public', publicRouter)

indexRouter.use(authentication)

indexRouter.use('/histories', historyRouter)
indexRouter.use('/genres', genreRouter)
indexRouter.use('/movies', movieRouter)

module.exports = indexRouter