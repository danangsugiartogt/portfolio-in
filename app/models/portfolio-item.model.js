const { DataTypes } = require('sequelize')
    , db            = require('../database.js')
    , Portfolios     = require('./portfolio.model.js')
    , Assets         = require('./asset.model.js');

const PortfolioItems = db.define('portfolio_items', 
{
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
    buyDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    portfolioId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    assetId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    }
}, {
    freezeTableName: true
});

// relation with portfolio
Portfolios.hasOne(PortfolioItems);
PortfolioItems.belongsTo(Portfolios, { foreignKey: 'portfolioId' });

// relation with asset
Assets.hasMany(PortfolioItems);
PortfolioItems.belongsTo(Assets, { foreignKey: 'assetId' });

module.exports = PortfolioItems;