const validator                          = require('../../utils/validator.util.js')
    , { successResponse, errorResponse } = require('../../utils/response.util.js')
    , authCase                           = require('../../use-cases/auth/auth.case.js');

const signUp = async (req, res) => {
    const { email, password } = req.body;

    // validate email and password
    const errorEmail = validator.isEmailValid(email);
    if(errorEmail != ''){
        return res.status(400).json(errorResponse(errorEmail));
    }

    const errorPassword = validator.isPasswordValid(password);
    if(errorPassword != ''){
        return res.status(400).json(errorResponse(errorPassword));
    }

    // signup
    console.log(password);
    const response = await authCase.addNewUser(email, password);

    if(response.error) return res.status(500).json(errorResponse(response.data));

    return res.status(201).json(successResponse('created successfully'));
}

const signIn = async (req, res) => {
    res.status(200).json({ path: '/signin' });
}

const signOut = async (req, res) => {
    res.status(200).json({ path: '/signout' });
}

const getMe = async (req, res) => {
    res.status(200).json({ path: '/getme' });
}

module.exports = {
    signUp,
    signIn,
    signOut,
    getMe
}