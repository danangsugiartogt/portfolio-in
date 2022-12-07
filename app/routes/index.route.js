const express   = require('express')
    , routes    = express.Router()
    , auth      = require('./auth/auth.route.js');

routes.use('/auth', auth);

module.exports = routes;