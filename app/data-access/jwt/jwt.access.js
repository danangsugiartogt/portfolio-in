const AuthJwt               = require('../../models/auth-jwt.model.js')
    , { operationResponse } = require('../../utils/response.util.js');

exports.isJwtExist = async (token) => {
    const authToken = await AuthJwt.findOne({ where: { token: token }});

    if(authToken) return true;
    return false;
}

exports.findJwtByUserId = async (userId) => {
    return await AuthJwt.findOne({ where: { userId: userId }});
}

exports.addJwt = async (userId, token) => {
    try{
        await AuthJwt.create({
            userId: userId,
            token: token
        });

        return operationResponse(false, 200, { token }, 'token successfully added.');
    }catch(error){
        console.log(error);
        return operationResponse(true, 500, '', error);
    }
}

exports.deleteJwt = async (token) => {
    try{
        const authJwt = await AuthJwt.findOne({ where: { token: token } });
        if(!authJwt) return operationResponse(true, 404, '',`This token doesn't exits.`);

        await AuthJwt.destroy({ where: { token: token } });
        return operationResponse(false, 200, '', 'successfully.');
    }catch(error){
        console.log(error);
        return operationResponse(true, 500, '', error);
    }
}