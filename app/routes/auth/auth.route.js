const express                            = require('express')
    , routes                             = express.Router()
    , { signUp, signIn, signOut, getMe } = require('../../controllers/auth/auth.controller.js')
    , validator                          = require('../../utils/validator.util.js');

routes.post('/signup', validator.validateSignUpBody, signUp);
routes.post('/signin', signIn);
routes.delete('/signout', signOut);
routes.get('/me', getMe);

module.exports = routes;