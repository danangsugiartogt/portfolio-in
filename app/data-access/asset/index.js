const { Op } = require('sequelize');
const { Asset } = require('../../database/models/index');
const { operationResponse } = require('../../helper/response.util');

exports.createNewAsset = async (name, alias, description) => {
  try {
    await Asset.create({
      name,
      alias,
      description,
      is_active: true,
    });

    return operationResponse(false, 201, '', 'successfully created.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};

exports.getAllAsset = async (limit, offset) => {
  try {
    const assets = await Asset.findAll({ where: { is_active: { [Op.eq]: true } }, limit, offset });

    return operationResponse(false, 200, assets, 'successfully get assets.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};
