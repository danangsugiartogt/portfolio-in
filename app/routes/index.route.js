const express = require('express');
const auth = require('./auth/index');
const asset = require('./asset/index');
const portfolio = require('./portfolio/index');

const routes = express.Router();

routes.use('/auth', auth);
routes.use('/asset', asset);
routes.use('/portfolio', portfolio);

module.exports = routes;
