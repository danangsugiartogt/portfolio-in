const express = require('express');
const { validateToken } = require('../../middleware/validateToken');
const { getCacheData } = require('../../middleware/cacheData');
const {
  getMyPortfolio, findPortfolio, updatePortfolio,
  addNewPortfolio, deletePortfolio,
} = require('../../controllers/portfolio/index');

const routes = express.Router();

routes.get('/', validateToken, getMyPortfolio);
routes.get('/:id', validateToken, getCacheData, findPortfolio);
routes.post('/', validateToken, addNewPortfolio);
routes.post('/:id', validateToken, updatePortfolio);
routes.delete('/:id', validateToken, deletePortfolio);

module.exports = routes;
