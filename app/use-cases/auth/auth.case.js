const userAccess            = require('../../data-access/users/index.access.js')
    , jwt                   = require('jsonwebtoken')
    , { operationResponse } = require('../../utils/response.util.js');

exports.addNewUser = async (email, password) => {
    const response = await userAccess.createUser(email, password);
    return response;
}

exports.signInUser = async (email, password) => {
    const response = await userAccess.signIn(email, password);

    if(response.error) return response;

    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });;
    console.log('accessToken: ' + accessToken);

    return operationResponse(false, 200, { token: accessToken }, 'login successfully.');;
}

exports.getMe = async (email) => {
    const response = await userAccess.getMe(email);
    return response;
}