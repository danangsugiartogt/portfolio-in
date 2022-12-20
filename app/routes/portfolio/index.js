const express = require('express');
const { validateToken } = require('../../middleware/validateToken');
const validator = require('../../helper/validator.util');
const {
  getAllPortfolio, findPortfolio,
  addNewPortfolio, deletePortfolio,
} = require('../../controllers/portfolio/index');

const routes = express.Router();

routes.get('/', validateToken, getAllPortfolio);
routes.get('/:id', validateToken, findPortfolio);
routes.post('/', validator.validateSignUpBody, validateToken, addNewPortfolio);
routes.delete('/:id', validateToken, deletePortfolio);

module.exports = routes;
