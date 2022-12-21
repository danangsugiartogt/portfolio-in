const express = require('express');
const { validateToken } = require('../../middleware/validateToken');
const {
  getMyPortfolio, findPortfolio,
  addNewPortfolio, deletePortfolio,
} = require('../../controllers/portfolio/index');

const routes = express.Router();

routes.get('/', validateToken, getMyPortfolio);
routes.get('/:id', validateToken, findPortfolio);
routes.post('/', validateToken, addNewPortfolio);
routes.delete('/:id', validateToken, deletePortfolio);

module.exports = routes;
