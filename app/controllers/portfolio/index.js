const { successResponse, errorResponse } = require('../../helper/response.util');
const authCase = require('../../use-cases/auth/index');

const getAllPortfolio = async (req, res) => {
  const { email, password } = req.body;
  const response = await authCase.addNewUser(email, password);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message));
};

const findPortfolio = async (req, res) => {
  const { email, password } = req.body;
  const response = await authCase.signInUser(email, password);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message, response.data));
};

const addNewPortfolio = async (req, res) => {
  const token = req.headers.authorization;
  const response = await authCase.signOutUser(token);

  return res.status(response.code).json(successResponse(response.message));
};

const deletePortfolio = async (req, res) => {
  const response = await authCase.getMe(req.email);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message, response.data));
};

module.exports = {
  getAllPortfolio,
  findPortfolio,
  addNewPortfolio,
  deletePortfolio,
};
