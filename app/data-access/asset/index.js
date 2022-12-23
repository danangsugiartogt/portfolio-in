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

exports.update = async (id, name, alias, description) => {
  try {
    const currentAsset = await Asset.findOne({ where: { id: { [Op.eq]: id } } });

    if (!currentAsset) return operationResponse(false, 404, '', 'asset not found.');

    const validName = name === null ? currentAsset.name : name;
    const validAllias = alias === null ? currentAsset.alias : alias;
    const validDescription = description === null ? currentAsset.description : description;

    await Asset.update(
      {
        name: validName,
        alias: validAllias,
        description: validDescription,
      },
      {
        where: { id: { [Op.eq]: id } },
      },
    );

    return operationResponse(false, 201, '', 'successfully created.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};

exports.getAllAsset = async (limit, offset) => {
  try {
    const assets = await Asset.findAll({
      where: { is_active: { [Op.eq]: true } },
      attributes: ['id', 'name', 'alias'],
      limit,
      offset,
    });

    return operationResponse(false, 200, assets, 'successfully get assets.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};

exports.delete = async (id) => {
  try {
    await Asset.destroy({ where: { id: { [Op.eq]: id } } });

    return operationResponse(false, 200, '', 'successfully delete asset.');
  } catch (error) {
    return operationResponse(true, 500, '', error);
  }
};
