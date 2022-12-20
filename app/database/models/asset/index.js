const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../../dbConnection');

const { Model } = Sequelize;

/**
|-------------------------------------------------------------
| Asset Model.
|-------------------------------------------------------------
*/

class Asset extends Model {}

Asset.init({
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
  alias: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
}, {
  sequelize: connection,
  modelName: 'Asset',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'asset',
});

module.exports = Asset;
