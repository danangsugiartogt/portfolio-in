'use strict';
const { DataTypes } = require('sequelize');

const tableName = 'portfolio_item';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
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
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable(tableName)
};