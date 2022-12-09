const jwt                                = require('jsonwebtoken')
    , { checkTokenValid }                = require('../use-cases/auth/index.js')
    , { errorResponse, successResponse } = require('../helper/response.util.js');

const validateToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(400).json(errorResponse('Authorization not present.'));

    const validateResponse = await checkTokenValid(token);
    if(!validateResponse.isTokenValid) return res.status(403).json(errorResponse('Token invalid.'));

    req.email = validateResponse.decoded.email;
    next();
}

module.exports = { validateToken }