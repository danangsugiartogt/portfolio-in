const express = require('express');

const { validateToken } = require('../../middleware/validateToken');
const {
  getAllAsset, findAsset, updateAsset,
  addNewAsset, deleteAsset,
} = require('../../controllers/asset/index');

const routes = express.Router();

routes.get('/', validateToken, getAllAsset);
routes.get('/:id', validateToken, findAsset);
routes.post('/', validateToken, addNewAsset);
routes.post('/:id', validateToken, updateAsset);
routes.delete('/:id', validateToken, deleteAsset);

module.exports = routes;
