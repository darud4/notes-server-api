const Sequelize = require('sequelize');

const {
  PG_HOST = 'localhost',
  PG_USER = 'postgres',
  PG_PASSWORD = 'postgres',
  PG_DB = 'postgres',
} = process.env;

const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
  dialect: 'postgres',
  host: PG_HOST,
});

module.exports = [sequelize, Sequelize];
