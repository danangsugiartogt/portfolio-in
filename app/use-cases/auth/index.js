const userAccess            = require('../../data-access/user/index.js')
    , jwtAccess             = require('../../helper/jwt/index.js')
    , jwt                   = require('jsonwebtoken')
    , { operationResponse } = require('../../helper/response.util.js');

exports.addNewUser = async (email, password) => {
    const response = await userAccess.createUser(email, password);
    return response;
}

exports.signInUser = async (email, password) => {
    const response = await userAccess.signIn(email, password);

    if(response.error) return response;

    const existedToken = await jwtAccess.findJwtByUserId(response.data.userId);

    let token;
    if(!existedToken){
        token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const addJwtResponse = await jwtAccess.addJwt(response.data.userId, token);
        if(addJwtResponse.error) return addJwtResponse;
    }
    else
        token = existedToken.token;

    console.log('accessToken: ' + token);

    return operationResponse(false, 200, { token: token }, 'successfully login.');
}

exports.signOutUser = async (token) => {
    const response = await jwtAccess.deleteJwt(token);

    if(response.error) return response;

    return operationResponse(false, 200, '', 'successfully sign out.');
}

exports.getMe = async (email) => {
    const response = await userAccess.getMe(email);
    return response;
}

exports.checkTokenValid = async (token) => {
    try{
        const decoded =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const isExist = await jwtAccess.isJwtExist(token);

        if(!isExist) return ({ isTokenValid: false });
    
        return ({ isTokenValid: true, decoded: decoded });
    }catch(error){
        console.log(error);
        return ({ isTokenValid: false });
    }
}