const jwt = require('jsonwebtoken');
const userAccess = require('../../data-access/user/index');
const jwtAccess = require('../../helper/jwt/index');
const { operationResponse } = require('../../helper/response.util');

const getDecodedJwt = async (token) => jwt.verify(
  token,
  process.env.ACCESS_TOKEN_SECRET,
  (err, decoded) => {
    if (err) {
      console.log(`error: ${err}`);
      return null;
    }
    console.log(`decoded: ${decoded.email}`);
    return decoded;
  },
);

const verifyJwt = (token) => {
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) return false;
    return true;
  });
};

const generateJwt = async (email, userId) => {
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  try {
    const response = await jwtAccess.addJwt(userId, token);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};

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
      const generateJwtResponse = await generateJwt(email, userId);
      console.log(generateJwt);
      if (generateJwtResponse.error) return generateJwtResponse;
      token = generateJwtResponse.data.token;
    }

    if (verifyJwt(jwtAuth.token)) {
      const generateJwtResponse = await generateJwt(email, userId);
      if (generateJwtResponse.error) return generateJwtResponse;
    } else {
      token = jwtAuth.token;
    }

    console.log(`accessToken: ${token}`);

    return operationResponse(false, 200, { token }, 'successfully login.');
  } catch (error) {
    console.log(error);
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

exports.checkTokenValid = async (token) => {
  try {
    const decoded = await getDecodedJwt(token);
    const isExist = await jwtAccess.isJwtExist(token);

    console.log(`decoded: ${decoded}`);
    console.log(`isExist: ${isExist}`);
    if (!decoded || !isExist) return ({ isTokenValid: false });

    return ({ isTokenValid: true, decoded });
  } catch (error) {
    console.log(error);
    return ({ isTokenValid: false });
  }
};
