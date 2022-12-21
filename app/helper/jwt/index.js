const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { AuthJwt } = require('../../database/models/index');
const { operationResponse } = require('../response.util');

const isJwtExist = async (token) => {
  try {
    const authToken = await AuthJwt.findOne({ where: { token: { [Op.eq]: token } } });
    return authToken !== null;
  } catch (error) {
    return false;
  }
};

exports.findJwtByUserId = async (userId) => {
  try {
    const jwtAuth = await AuthJwt.findOne({ where: { user_id: { [Op.eq]: userId } } });
    return jwtAuth;
  } catch (error) {
    return null;
  }
};

const addJwt = async (userId, token) => {
  try {
    await AuthJwt.create({
      user_id: userId,
      token,
    });

    return operationResponse(false, 200, { token }, 'token successfully added.');
  } catch (error) {
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
    return operationResponse(true, 500, '', error);
  }
};

exports.generateJwt = async (email, userId) => {
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  try {
    const response = await addJwt(userId, token);
    return response;
  } catch (err) {
    return null;
  }
};

const getDecodedJwt = async (token) => jwt.verify(
  token,
  process.env.ACCESS_TOKEN_SECRET,
  (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  },
);

exports.verifyJwt = (token) => getDecodedJwt(token);

exports.checkTokenValid = async (token) => {
  try {
    const decoded = await getDecodedJwt(token);
    const isExist = await isJwtExist(token);

    if (!decoded || !isExist) return ({ isTokenValid: false });

    return ({ isTokenValid: true, decoded });
  } catch (error) {
    return ({ isTokenValid: false });
  }
};

exports.getUserIdByToken = async (token) => {
  try {
    const authData = await AuthJwt.findOne({ where: { token: { [Op.eq]: token } } });

    if (!authData) return ({ userId: null });

    return ({ userId: authData.user_id });
  } catch (err) {
    return ({ userId: null });
  }
};
