const { AuthJwt }           = require('../../database/models/index.js')
    , { Op }                = require('sequelize')
    , { operationResponse } = require('../response.util.js');

exports.isJwtExist = async (token) => {
    try{
        const authToken = await AuthJwt.findOne({ where: { token: { [Op.eq]: token } }});
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

exports.findJwtByUserId = async (user_id) => {
    try{
        const user = await AuthJwt.findOne({ where: { user_id: { [Op.eq]: user_id } }});
        return user;
    }catch(error){
        console.log(error);
        return null;
    }
}

exports.addJwt = async (user_id, token) => {
    try{
        await AuthJwt.create({
            user_id: user_id,
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
        const authJwt = await AuthJwt.findOne({ where: { token: { [Op.eq]: token } } });
        if(!authJwt) return operationResponse(true, 404, '',`This token doesn't exits.`);

        await AuthJwt.destroy({ where: { token: { [Op.eq]: token } } });
        return operationResponse(false, 200, '', 'successfully.');
    }catch(error){
        console.log(error);
        return operationResponse(true, 500, '', error);
    }
}