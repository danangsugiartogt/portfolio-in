const { successResponse, errorResponse } = require('../../helper/response.util');
const portfolioItem = require('../../use-cases/portfolio-item/index');

const getMyItems = async (req, res) => {
  const response = await portfolioItem.getItemsByPortfolioId(req.params.id);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message, response.data));
};

const addNewItem = async (req, res) => {
  const response = await portfolioItem.addNewItem(req.body);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message));
};

const updateItem = async (req, res) => {
  const {
    name, quantity, price, buyDate, assetId,
  } = req.body;

  const data = {
    id: req.params.id, name, quantity, price, buyDate, assetId,
  };

  const response = await portfolioItem.updateItem(data);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message, response.data));
};

const deleteItem = async (req, res) => {
  const response = await portfolioItem.deleteItem(req.params.id);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message, response.data));
};

module.exports = {
  getMyItems,
  addNewItem,
  updateItem,
  deleteItem,
};
