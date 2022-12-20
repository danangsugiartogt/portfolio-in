const userAccess = require('../../data-access/user/index');
const jwtAccess = require('../../helper/jwt/index');
const { operationResponse } = require('../../helper/response.util');
const jwtHelper = require('../../helper/jwt/index');

exports.addNewUser = async (email, password) => {
  const response = await userAccess.createUser(email, password);
  return response;
};

exports.signInUser = async (email, password) => {
  try {
    const response = await userAccess.signIn(email, password);

    if (response.error) return response;

    const { userId } = response.data;
    const jwtAuth = await jwtAccess.findJwtByUserId(userId);

    let token;
    if (!jwtAuth) {
      const generateJwtResponse = await jwtHelper.generateJwt(email, userId);

      if (generateJwtResponse.error) return generateJwtResponse;
      token = generateJwtResponse.data.token;
    } else if (jwtHelper.verifyJwt(jwtAuth.token)) {
      const generateJwtResponse = await jwtHelper.generateJwt(email, userId);
      if (generateJwtResponse.error) return generateJwtResponse;
    } else {
      token = jwtAuth.token;
    }

    return operationResponse(false, 200, { token }, 'successfully login.');
  } catch (error) {
    return operationResponse(true, 500, '', 'something when wrong.');
  }
};

exports.signOutUser = async (token) => {
  const response = await jwtAccess.deleteJwt(token);

  if (response.error) return response;

  return operationResponse(false, 200, '', 'successfully sign out.');
};

exports.getMe = async (email) => {
  const response = await userAccess.getMe(email);
  return response;
};
