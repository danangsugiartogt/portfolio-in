const express   = require('express')
    , routes    = express.Router()
    , auth      = require('./auth/index.js');

routes.use('/auth', auth);

module.exports = routes;