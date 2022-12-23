const express = require('express');
const { validateToken } = require('../../middleware/validateToken');
const {
  getMyItems, updateItem,
  addNewItem, deleteItem,
} = require('../../controllers/portfolio-item/index');

const routes = express.Router();

routes.get('/:id', validateToken, getMyItems);
routes.post('/', validateToken, addNewItem);
routes.post('/:id', validateToken, updateItem);
routes.delete('/:id', validateToken, deleteItem);

module.exports = routes;
