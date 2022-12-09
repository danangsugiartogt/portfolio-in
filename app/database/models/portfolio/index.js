// const { DataTypes } = require('sequelize')
//     , db            = require('../../database.js')
//     , Users         = require('./user.model.js');

// const Portfolios = db.define('portfolios', 
// {
//     name:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     userId:{
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     isActive:{
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//         allowNull: false
//     }
// }, {
//     freezeTableName: true
// });

// Users.hasMany(Portfolios);
// Portfolios.belongsTo(Users, { foreignKey: 'userId' });

// module.exports = Portfolios;\

const { Sequelize, DataTypes }  = require('sequelize')
    , connection     = require('../../dbConnection');

const { Model } = Sequelize;

/**
|-------------------------------------------------------------
| Portfolio Model.
|-------------------------------------------------------------
*/

class Portfolio extends Model {}

Portfolio.init({
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    is_active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
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
  tableName: 'portfolio'
});

module.exports = Portfolio;