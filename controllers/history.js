const { History, User } = require('../models')

class HistoryController {
  static async getHistories(req, res, next) {
    try {
      const result = await History.findAll({
        order: [['updatedAt', 'DESC']], 
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
          model: User,
          attributes: ['id', 'username', 'email']
        }]})
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = HistoryController