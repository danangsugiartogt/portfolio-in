const { Op, Sequelize } = require('sequelize');
const { Portfolio, PortfolioItem, Asset } = require('../../database/models/index');
const { operationResponse } = require('../../helper/response.util');

exports.createNewPortfolio = async (portfolioName, userId) => {
  try {
    await Portfolio.create({
      name: portfolioName,
      user_id: userId,
      is_active: true,
    });

    return operationResponse(false, 201, '', 'successfully created.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};

exports.update = async (id, portfolioName) => {
  try {
    const portfolio = await Portfolio.findOne({ where: { id: { [Op.eq]: id } } });

    if (!portfolio) return operationResponse(true, 404, '', 'portfolio not found.');

    const validName = portfolioName === null ? portfolio.name : portfolioName;

    await Portfolio.update(
      {
        name: validName,
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

exports.myPortfolio = async (userId, limit, offset) => {
  try {
    const portfolioList = await Portfolio.findAll({
      where: { user_id: { [Op.eq]: userId } },
      attributes: ['id', 'name'],
      order: [
        ['created_at', 'ASC'],
      ],
      limit,
      offset,
    });

    return operationResponse(false, 200, portfolioList, 'successfully get portfolio list.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};

exports.findPortfolio = async (id) => {
  try {
    const portfolio = await Portfolio.findAll({
      where: { id: { [Op.eq]: id } },
      attributes: [
        'id',
        'name',
        [Sequelize.col('PortfolioItems.id'), 'itemId'],
        [Sequelize.col('PortfolioItems.quantity'), 'quantity'],
        [Sequelize.col('PortfolioItems.price'), 'price'],
        [Sequelize.col('PortfolioItems.buy_date'), 'buyDate'],
        [Sequelize.col('PortfolioItems.Asset.id'), 'assetId'],
        [Sequelize.col('PortfolioItems.Asset.name'), 'assetName'],
      ],
      raw: true,
      include: {
        model: PortfolioItem,
        attributes: [],
        include: {
          model: Asset,
          attributes: [],
        },
      },
    });

    if (portfolio.length <= 0) return operationResponse(true, 400, null, 'portfolio not found.');

    return operationResponse(false, 200, portfolio, 'successfully get portfolio.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};

exports.delete = async (id) => {
  try {
    const portfolio = await Portfolio.findOne({ where: { id: { [Op.eq]: id } } });

    if (!portfolio) return operationResponse(true, 404, '', 'portfolio not found.');

    await Portfolio.destroy({ where: { id: { [Op.eq]: id } } });

    return operationResponse(false, 200, '', 'successfully delete portfolio.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};
