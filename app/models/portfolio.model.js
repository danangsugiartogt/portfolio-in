const { DataTypes } = require('sequelize')
    , db            = require('../database.js')
    , Users         = require('./user.model.js');

const Portfolios = db.define('portfolios', 
{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    freezeTableName: true
});

Users.hasMany(Portfolios);
Portfolios.belongsTo(Users, { foreignKey: 'userId' });

module.exports = Portfolios;