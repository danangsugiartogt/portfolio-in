const { checkTokenValid } = require('../use-cases/auth/index');
const { errorResponse } = require('../helper/response.util');

// eslint-disable-next-line consistent-return
const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json(errorResponse('Authorization not present.'));

  const validateResponse = await checkTokenValid(token);
  if (!validateResponse.isTokenValid) return res.status(403).json(errorResponse('Token invalid.'));

  req.email = validateResponse.decoded.email;
  next();
};

module.exports = { validateToken };
