const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

class UserController {
  static async createAccount(req, res, next) {
    try {
      const { email, password } = req.body

      const result = await User.create({
        email,
        password,
        role: 'Admin'
      })
      res.status(201).json({
        username: result.username,
        email: result.email,
        role: result.role,
        address: result.address,
        phoneNumber: result.phoneNumber
      })
    } catch (error) {
      next(error)
    }
  }

  static async createPublicAccount(req, res, next) {
    try {
      const { email, password } = req.body

      const result = await User.create({
        email,
        password,
        role: 'Customer'
      })
      res.status(201).json({
        id: result.id,
        username: result.username,
        email: result.email,
        role: result.role,
        address: result.address,
        phoneNumber: result.phoneNumber
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const findUser = await User.findOne({ where: { email } })

      if (!findUser) {
        throw { name: 'EmailInvalid' }
      }
      if (!comparePassword(password, findUser.password)) {
        throw { name: 'PasswordInvalid' }
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
        role: findUser.role
      }
      const token = createToken(payload)

      res.status(200).json({
        access_token: token,
        id: findUser.id,
        email: findUser.email,
        role: findUser.role
      })
    } catch (error) {
      next(error)
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const { token } = req.body
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID
      })

      const payload = ticket.getPayload();

      const [user] = await User.findOrCreate({
        where: {
          email: payload.email
        },
        defaults: {
          password: '12345678',
          role: 'Staff'
        }
      })

      const accessToken = createToken({
        id: user.id
      })
      res.status(200).json({
        access_token: accessToken,
        id: user.id,
        email: user.email,
        role: user.role
      })
    } catch (error) {
      next(error)
    }
  }

  static async loginGooglePublic(req, res, next) {
    try {
      const { token } = req.body
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID
      })

      const payload = ticket.getPayload();

      const [user] = await User.findOrCreate({
        where: {
          email: payload.email
        },
        defaults: {
          password: '12345678',
          role: 'Customer'
        }
      })

      const accessToken = createToken({
        id: user.id
      })
      res.status(200).json({
        access_token: accessToken,
        id: user.id,
        email: user.email,
        role: user.role
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController