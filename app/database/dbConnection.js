// const { Sequelize } = require('sequelize')
//     , dbConfig      = require('./config/db.config.js');

// const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operationsAliases: false,
//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle
//     }
// });

// module.exports = db;
const { Sequelize }         = require('sequelize')
    , path                  = require('path')
    , dotenv                = require('dotenv')
    , { defaultToIfEmpty }  = require('../helper/utils');

dotenv.config({path:path.resolve(__dirname, '../.env')});

const DB_DIALECT = defaultToIfEmpty(process.env.DB_DIALECT, 'mysql');
const DB_HOST = defaultToIfEmpty(process.env.DB_HOST, 'localhost');
const DB_PORT = defaultToIfEmpty(process.env.DB_PORT, 3306);
const DB_NAME = defaultToIfEmpty(process.env.DB_NAME, 'example');
const DB_USERNAME = defaultToIfEmpty(process.env.DB_USERNAME, 'example');
const DB_PASSWORD = defaultToIfEmpty(process.env.DB_PASSWORD, 'example');

const sequelizeConnection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  dialectOptions: {
    options: {
      encrypt: true,
      // useUTC: true
    }
  },
  logging: false, // console.log,
  // timezone: '+08:00',
  pool: {
    max: 1,
    min: 0,
    idle: 10000
  }
});

/**
 * Check connection to DB
 */
exports.sequelizeConnectionChecker = async(_, res, next) => {
  try {
    await sequelizeConnection.authenticate();
    return next();
  } catch (e) {
    e.message = `Unable to connect to the db: ${e.message}`;
    console.error(e.message);
    return res
      .status(500)
      .json({
        success: {
          status: false,
          message: 'Oops! Something went wrong, please try again or contact the support desk'
        }
      });
  }
};

module.exports = sequelizeConnection;