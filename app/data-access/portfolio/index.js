const { Op } = require('sequelize');
const { Portfolio } = require('../../database/models/index');
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
      limit,
      offset,
    });

    return operationResponse(false, 200, portfolioList, 'successfully get portfolio list.');
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
