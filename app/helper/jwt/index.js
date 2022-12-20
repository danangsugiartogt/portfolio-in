const { Op } = require('sequelize');
const { AuthJwt } = require('../../database/models/index');
const { operationResponse } = require('../response.util');

exports.isJwtExist = async (token) => {
  try {
    const authToken = await AuthJwt.findOne({ where: { token: { [Op.eq]: token } } });
    return authToken !== null;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.findJwtByUserId = async (userId) => {
  try {
    const jwtAuth = await AuthJwt.findOne({ where: { user_id: { [Op.eq]: userId } } });
    return jwtAuth;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.addJwt = async (userId, token) => {
  try {
    await AuthJwt.create({
      user_id: userId,
      token,
    });

    return operationResponse(false, 200, { token }, 'token successfully added.');
  } catch (error) {
    console.log(error);
    return operationResponse(true, 500, '', error);
  }
};

exports.deleteJwt = async (token) => {
  try {
    const authJwt = await AuthJwt.findOne({ where: { token: { [Op.eq]: token } } });
    if (!authJwt) return operationResponse(true, 404, '', 'This token doesn\'t exits.');

    await AuthJwt.destroy({ where: { token: { [Op.eq]: token } } });
    return operationResponse(false, 200, '', 'successfully.');
  } catch (error) {
    console.log(error);
    return operationResponse(true, 500, '', error);
  }
};
