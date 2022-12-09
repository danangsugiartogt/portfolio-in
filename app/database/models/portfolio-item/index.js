// const { DataTypes } = require('sequelize')
//     , db            = require('../../database.js')
//     , Portfolios     = require('./portfolio.model.js')
//     , Assets         = require('../asset.model.js');

// const PortfolioItems = db.define('portfolio_items', 
// {
//     name:{
//         type: DataTypes.STRING,
//         allowNull: false,
//     },    
//     quantity:{
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     price:{
//         type: DataTypes.DECIMAL,
//         allowNull: false,
//     },
//     buyDate:{
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     portfolioId:{
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     assetId:{
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     isActive:{
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//         allowNull: false,
//     }
// }, {
//     freezeTableName: true
// });

// // relation with portfolio
// Portfolios.hasOne(PortfolioItems);
// PortfolioItems.belongsTo(Portfolios, { foreignKey: 'portfolioId' });

// // relation with asset
// Assets.hasMany(PortfolioItems);
// PortfolioItems.belongsTo(Assets, { foreignKey: 'assetId' });

// module.exports = PortfolioItems;

const { Sequelize, DataTypes }  = require('sequelize')
    , connection     = require('../../dbConnection');

const { Model } = Sequelize;

/**
|-------------------------------------------------------------
| PortfolioItem Model.
|-------------------------------------------------------------
*/

class PortfolioItem extends Model {}

PortfolioItem.init({
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },    
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    buy_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    portfolio_id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    asset_id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    is_active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true
    }
}, {
  sequelize: connection,
  modelName: 'PortfolioItem',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'portfolio_item'
});

module.exports = PortfolioItem;