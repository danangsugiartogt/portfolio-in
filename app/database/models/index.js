const User = require('./user');
const AuthJwt = require('./auth-jwt');
const Asset = require('./asset');
const PortfolioItem = require('./portfolio-item');
const Portfolio = require('./portfolio');

/**
|---------------------------------------------------------------------------------------------------
| The model exported from this file is a model that has been associated with other models.
| If you want to use models without associations you can directly import files in each model folder.
|---------------------------------------------------------------------------------------------------
*/

User.hasMany(Portfolio);
Portfolio.belongsTo(User, { foreignKey: 'userId' });

Portfolio.hasOne(PortfolioItem);
PortfolioItem.belongsTo(Portfolio, { foreignKey: 'portfolioId' });

Asset.hasMany(PortfolioItem);
PortfolioItem.belongsTo(Asset, { foreignKey: 'assetId' });

module.exports = {
  User,
  AuthJwt,
  Portfolio,
  PortfolioItem,
  Asset,
};
