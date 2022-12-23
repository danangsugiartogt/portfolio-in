const express = require('express');

const { validateToken } = require('../../middleware/validateToken');
const validator = require('../../helper/validator.util');
const {
  signUp, signIn, signOut, getMe,
} = require('../../controllers/auth/index');

const routes = express.Router();

routes.post('/signup', validator.validateSignUpBody, signUp);
routes.post('/signin', signIn);
routes.delete('/signout', validateToken, signOut);
routes.get('/me', validateToken, getMe);

module.exports = routes;
