const { DataTypes } = require('sequelize')
    , db            = require('../database.js');

const AuthJwt = db.define('auth_jwt', 
{
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },    
    token:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true
});

module.exports = AuthJwt;