const { DataTypes } = require('sequelize')
    , db            = require('../database.js');

const Assets = db.define('assets', 
{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },    
    alias:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    }
}, {
    freezeTableName: true
});

module.exports = Assets;