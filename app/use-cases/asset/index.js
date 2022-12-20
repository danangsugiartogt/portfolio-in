const { pick, toInteger } = require('lodash');
const assetAccess = require('../../data-access/asset/index');
const { defaultToIfEmpty } = require('../../helper/utils');

exports.addNewAsset = async (name, alias, description) => {
  const validDescription = description || name;
  const response = await assetAccess.createNewAsset(name, alias, validDescription);
  return response;
};

exports.updateAsset = async (id, name, alias, description) => {
  const response = await assetAccess.update(id, name, alias, description);
  return response;
};

exports.getAllAsset = async (filter) => {
  const filterBy = pick(filter, ['limit', 'page']);

  let limit = toInteger(defaultToIfEmpty(filterBy.limit, 100));
  limit = limit > 100 ? 100 : limit;

  const page = toInteger(defaultToIfEmpty(filterBy.page, 1));
  const offset = limit * page - limit;

  const response = await assetAccess.getAllAsset(limit, offset);

  if (response.error) return response;

  response.data = { page, offset, assets: response.data };

  return response;
};

exports.deleteAsset = async (id) => {
  const response = await assetAccess.delete(id);

  if (response.error) return response;

  return response;
};
