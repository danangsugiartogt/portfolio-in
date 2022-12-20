const { successResponse, errorResponse } = require('../../helper/response.util');
const assetCase = require('../../use-cases/asset/index');

const getAllAsset = async (req, res) => {
  const response = await assetCase.getAllAsset(req.query);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message, response.data));
};

const findAsset = async (req, res) => {
  const { email, password } = req.body;
  const response = await assetCase.signInUser(email, password);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message, response.data));
};

const addNewAsset = async (req, res) => {
  const { name, alias, description } = req.body;
  const response = await assetCase.addNewAsset(name, alias, description);

  return res.status(response.code).json(successResponse(response.message));
};

const deleteAsset = async (req, res) => {
  const response = await assetCase.getMe(req.email);

  if (response.error) return res.status(response.code).json(errorResponse(response.message));

  return res.status(response.code).json(successResponse(response.message, response.data));
};

module.exports = {
  getAllAsset,
  findAsset,
  addNewAsset,
  deleteAsset,
};
