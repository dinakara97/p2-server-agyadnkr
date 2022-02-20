const genreRouter = require('express').Router();
const GenreController = require('../controllers/genre')

genreRouter.post('/', GenreController.createGenres)
genreRouter.get('/', GenreController.getGenres)

module.exports = genreRouter
