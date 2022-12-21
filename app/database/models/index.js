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

User.hasMany(Portfolio, { foreignKey: { name: 'user_id', allowNull: false } });
Portfolio.belongsTo(User);

Portfolio.hasOne(PortfolioItem);
PortfolioItem.belongsTo(Portfolio, { foreignKey: 'portfolio_id' });

Asset.hasMany(PortfolioItem);
PortfolioItem.belongsTo(Asset, { foreignKey: 'asset_id' });

module.exports = {
  User,
  AuthJwt,
  Portfolio,
  PortfolioItem,
  Asset,
};
