const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../../dbConnection');

const { Model } = Sequelize;

/**
|-------------------------------------------------------------
| AuthJwt Model.
|-------------------------------------------------------------
*/

class AuthJwt extends Model {}

AuthJwt.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
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
  modelName: 'AuthJwt',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'auth_jwt',
});

module.exports = AuthJwt;
