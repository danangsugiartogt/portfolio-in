const { Sequelize, DataTypes }  = require('sequelize')
    , db             = require('../database.js');

const Users = db.define('users', 
{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    type:{
        type: Sequelize.ENUM('free', 'premium'),
        defaultValue: 'free',
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = Users;