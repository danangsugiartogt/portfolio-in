// const { Sequelize, DataTypes }  = require('sequelize')
//     , db                        = require('../../dbConnection.js');

// const Users = db.define('users', 
// {
//     name:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     type:{
//         type: Sequelize.ENUM('free', 'premium'),
//         defaultValue: 'free',
//         allowNull: false
//     }
// }, {
//     freezeTableName: true
// });

// module.exports = Users;
const { Sequelize, DataTypes }  = require('sequelize')
    , { isEmpty }    = require('lodash')
    , connection     = require('../../dbConnection');

const { Model, Op } = Sequelize;

/**
|-------------------------------------------------------------
| User Model.
|-------------------------------------------------------------
*/

class User extends Model {}

User.init({
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
  sequelize: connection,
  modelName: 'User',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'user'
});

module.exports = User;