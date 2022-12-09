'use strict';
const { DataTypes } = require('sequelize');

const tableName = 'asset';

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
    alias:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
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