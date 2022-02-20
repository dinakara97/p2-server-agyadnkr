const movieRouter = require('express').Router();
const MovieController = require('../controllers/movie')
const authorization = require('../middlewares/authorization')
const adminAuthorization = require('../middlewares/adminAuth')

movieRouter.post('/', MovieController.createMovies)
movieRouter.get('/', MovieController.getMovies)
movieRouter.get('/:id', MovieController.moviesById)

// User authorization
movieRouter.put('/:id', authorization, MovieController.editMovies)
movieRouter.delete('/:id', authorization, MovieController.deleteMovies)

// To update status need Authorization Admin
movieRouter.patch('/:id', adminAuthorization, MovieController.updateStatus)

module.exports = movieRouter;