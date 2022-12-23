const { Op } = require('sequelize');
const { PortfolioItem } = require('../../database/models/index');
const { operationResponse } = require('../../helper/response.util');

exports.create = async (name, quantity, price, buyDate, portfolioId, assetId) => {
  try {
    await PortfolioItem.create({
      name,
      quantity,
      price,
      buy_date: buyDate,
      portfolio_id: portfolioId,
      asset_id: assetId,
    });

    return operationResponse(false, 201, '', 'successfully created.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};

exports.update = async (id, name, quantity, price, buyDate, assetId) => {
  try {
    const item = await PortfolioItem.findOne({ where: { id: { [Op.eq]: id } } });

    if (!item) return operationResponse(true, 404, '', 'item not found.');

    const validName = name === null ? item.name : name;
    const validQuantity = quantity === null ? item.name : quantity;
    const validPrice = price === null ? item.name : price;
    const validBuyDate = buyDate === null ? item.name : buyDate;
    const validAssetId = assetId === null ? item.name : assetId;

    await PortfolioItem.update(
      {
        name: validName,
        quantity: validQuantity,
        price: validPrice,
        buy_date: validBuyDate,
        assetId: validAssetId,
      },
      {
        where: { id: { [Op.eq]: id } },
      },
    );

    return operationResponse(false, 201, '', 'successfully updated.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};

exports.getItemsByPortfolioId = async (portfolioId) => {
  try {
    const itemList = await PortfolioItem.findAll({
      where: { portfolio_id: { [Op.eq]: portfolioId } },
      attributes: ['id', 'name', 'quantity', 'price', 'buy_date'],
    });

    return operationResponse(false, 200, itemList, 'successfully get item list.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};

exports.delete = async (id) => {
  try {
    const portfolio = await PortfolioItem.findOne({ where: { id: { [Op.eq]: id } } });

    if (!portfolio) return operationResponse(true, 404, '', 'item not found.');

    await PortfolioItem.destroy({ where: { id: { [Op.eq]: id } } });

    return operationResponse(false, 200, '', 'successfully delete item.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};
