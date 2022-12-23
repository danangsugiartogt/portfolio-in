const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../../dbConnection');
const User = require('../user');

const { Model } = Sequelize;

/**
|-------------------------------------------------------------
| Portfolio Model.
|-------------------------------------------------------------
*/

class Portfolio extends Model {}

Portfolio.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  deleted_at: {
    type: Sequelize.DATE,
    allowNull: true,
  },
}, {
  sequelize: connection,
  modelName: 'Portfolio',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'portfolio',
});

module.exports = Portfolio;
