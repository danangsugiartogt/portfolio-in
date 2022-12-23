const itemAccess = require('../../data-access/portfolio-item/index');
const { operationResponse } = require('../../helper/response.util');

exports.addNewItem = async (data) => {
  try {
    const {
      name, quantity, price, buyDate, portfolioId, assetId,
    } = data;

    const response = await itemAccess
      .create(name, quantity, price, buyDate, portfolioId, assetId);

    return response;
  } catch (err) {
    return operationResponse(true, 500, '', err);
  }
};

exports.updateItem = async (data) => {
  try {
    const {
      id, name, quantity, price, buyDate, assetId,
    } = data;

    const response = await itemAccess.update(id, name, quantity, price, buyDate, assetId);
    return response;
  } catch (err) {
    return operationResponse(true, 500, '', err);
  }
};

exports.getItemsByPortfolioId = async (portfolioId) => {
  try {
    const response = await itemAccess.getItemsByPortfolioId(portfolioId);

    if (response.error) return response;

    response.data = { itemList: response.data };

    return response;
  } catch (err) {
    return operationResponse(true, 500, '', err);
  }
};

exports.deleteItem = async (id) => {
  const response = await itemAccess.delete(id);

  if (response.error) return response;

  return response;
};
