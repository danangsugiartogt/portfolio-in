const path = require('path');

require('dotenv').config({path:path.resolve(__dirname, '../app/.env')});

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    debug: true,
    dialectOptions: {
      options: {
        encrypt: true,
        // useUTC: true
      },
      bigNumberStrings: true
    },
    migrationStorageTableName: 'sequelize_meta',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data'
  },
  uat: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      options: {
        encrypt: true,
        // useUTC: true
      },
      bigNumberStrings: true
    },
    migrationStorageTableName: 'sequelize_meta',
    seederStorage: 'sequelize',
    seederStoragePath: 'sequelize_data'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      options: {
        encrypt: true,
        // useUTC: true
      },
      bigNumberStrings: true
    },
    migrationStorageTableName: 'sequelize_meta',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data'
  }
}