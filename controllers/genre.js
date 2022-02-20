const { Genre, Movie } = require('../models')

class GenreController {
  static async createGenres(req, res, next) {
    try {
      const { name } = req.body
      const result = await Genre.create({ name })
      res.status(201).json(result)
    } catch (error) {
      // res.status(500).json(error)
      next(error)
    }
  }

  static async getGenres(req, res, next) {
    try {
      const result = await Genre.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']]
      })
      res.status(200).json(result)
    } catch (error) {
      // res.status(500).json(error)
      next(error)
    }
  }
}

module.exports = GenreController