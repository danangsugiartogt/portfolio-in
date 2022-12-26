const { pick, toInteger } = require('lodash');
const portfolioAccess = require('../../data-access/portfolio/index');
const { redis } = require('../../vendors/index');
const { defaultToIfEmpty } = require('../../helper/utils');
const jwtHelper = require('../../helper/jwt/index');
const { operationResponse } = require('../../helper/response.util');

exports.addNewPortfolio = async (token, portfolioName) => {
  try {
    const user = await jwtHelper.getUserIdByToken(token);
    const response = await portfolioAccess.createNewPortfolio(portfolioName, user.userId);
    return response;
  } catch (err) {
    return operationResponse(true, 500, '', err);
  }
};

exports.updatePortfolio = async (data) => {
  try {
    const { id, name } = data;
    const response = await portfolioAccess.update(id, name);
    return response;
  } catch (err) {
    return operationResponse(true, 500, '', err);
  }
};

exports.getMyPortfolio = async (token, filter) => {
  try {
    const user = await jwtHelper.getUserIdByToken(token);

    const filterBy = pick(filter, ['limit', 'page']);

    let limit = toInteger(defaultToIfEmpty(filterBy.limit, 100));
    limit = limit > 100 ? 100 : limit;

    const page = toInteger(defaultToIfEmpty(filterBy.page, 1));
    const offset = limit * page - limit;

    const response = await portfolioAccess.myPortfolio(user.userId, limit, offset);

    if (response.error) return response;

    response.data = { meta: { page, offset }, portfolioList: response.data };

    return response;
  } catch (err) {
    return operationResponse(true, 500, '', err);
  }
};

exports.findPortfolio = async (id) => {
  try {
    const response = await portfolioAccess.findPortfolio(id);

    if (response.error) return response;

    // write to cache
    await redis.set(id, JSON.stringify(response.data));
    // expired in 10 minutes
    await redis.expire(id, 600);

    return response;
  } catch (err) {
    return operationResponse(true, 500, '', err);
  }
};

exports.deletePortfolio = async (id) => {
  const response = await portfolioAccess.delete(id);

  if (response.error) return response;

  return response;
};
