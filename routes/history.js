const historyRouter = require('express').Router();
const HistoryController = require('../controllers/history');

historyRouter.get('/', HistoryController.getHistories)

module.exports = historyRouter;