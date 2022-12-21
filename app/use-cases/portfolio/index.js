const { pick, toInteger } = require('lodash');
const portfolioAccess = require('../../data-access/portfolio/index');
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

exports.updatePortfolio = async (id, portfolioName) => {
  const response = await portfolioAccess.update(id, portfolioName);
  return response;
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

exports.deletePortfolio = async (id) => {
  const response = await portfolioAccess.delete(id);

  if (response.error) return response;

  return response;
};
