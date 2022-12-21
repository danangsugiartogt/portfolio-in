const { successResponse, errorResponse } = require('../../helper/response.util');
const portfolio = require('../../use-cases/portfolio/index');

const getMyPortfolio = async (req, res) => {
  const token = req.headers.authorization;
  const response = await portfolio.getMyPortfolio(token, req.query);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message, response.data));
};

const findPortfolio = async (req, res) => {
  const { email, password } = req.body;
  const response = await portfolio.signInUser(email, password);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message, response.data));
};

const addNewPortfolio = async (req, res) => {
  const token = req.headers.authorization;
  const response = await portfolio.addNewPortfolio(token, req.body.name);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message));
};

const deletePortfolio = async (req, res) => {
  const response = await portfolio.getMe(req.email);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message, response.data));
};

module.exports = {
  getMyPortfolio,
  findPortfolio,
  addNewPortfolio,
  deletePortfolio,
};
