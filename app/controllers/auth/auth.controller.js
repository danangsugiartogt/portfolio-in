const validator                          = require('../../utils/validator.util.js')
    , { successResponse, errorResponse } = require('../../utils/response.util.js')
    , authCase                           = require('../../use-cases/auth/auth.case.js');

const signUp = async (req, res) => {
    const { email, password } = req.body;
    const response = await authCase.addNewUser(email, password);

    if(response.error) return res.status(response.code).json(errorResponse(response.message));

    return res.status(response.code).json(successResponse(response.message));
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    const response = await authCase.signInUser(email, password);

    if(response.error) return res.status(response.code).json(errorResponse(response.message));
    
    return res.status(response.code).json(successResponse(response.message, response.data));
}

const signOut = async (req, res) => {
    const token = req.headers['authorization'];
    const response = await authCase.signOutUser(token);
    
    return res.status(response.code).json(successResponse(response.message));
}

const getMe = async (req, res) => {
    const response = await authCase.getMe(req.email);

    if(response.error) return res.status(response.code).json(errorResponse(response.message));
    
    return res.status(response.code).json(successResponse(response.message, response.data));
}

module.exports = {
    signUp,
    signIn,
    signOut,
    getMe
}