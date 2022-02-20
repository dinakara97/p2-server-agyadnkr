const { Movie, User } = require('../models')

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params
    const movie = await Movie.findByPk(id)

    if (!movie) {
      throw { name: 'NotFound' }
    }

    const user = await User.findByPk(req.user.id)

    if (user.role === 'Admin') {
      next()
    } else if (movie.authorId === user.id) {
      next()
    } else {
      throw ({ name: 'Forbidden' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authorization