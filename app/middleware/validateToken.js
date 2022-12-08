const jwt                                = require('jsonwebtoken')
    , { errorResponse, successResponse } = require('../utils/response.util.js');

const validateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(400).json(errorResponse('Authorization not present.'));

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error){
            console.log(error);
            return res.status(403).json(errorResponse('Token invalid.'));
        }
        else {
            req.email = payload.email;
            next();
        }
    })
}

module.exports = { validateToken }