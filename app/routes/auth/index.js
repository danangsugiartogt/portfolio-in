const express                            = require('express')
    , routes                             = express.Router()
    , { signUp, signIn, signOut, getMe } = require('../../controllers/auth/index.js')
    , { validateToken }                  = require('../../middleware/validateToken.js')
    , validator                          = require('../../helper/validator.util.js');

routes.post('/signup', validator.validateSignUpBody, signUp);
routes.post('/signin', signIn);
routes.delete('/signout', validateToken, signOut);
routes.get('/me', validateToken, getMe);

module.exports = routes;