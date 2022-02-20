const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers

    if (!access_token) {
      throw { name: 'AuthenticationFailed' }
    }

    const { id } = verifyToken(access_token)
    const findUser = await User.findByPk(id)

    if (!findUser) {
      throw { name: 'AuthenticationFailed' }
    }

    req.user = {
      id,
      role: findUser.role
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication