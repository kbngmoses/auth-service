// Setting up database connection by using the Sequelize library.

const { DATABASE_URL } = require('../config/constants');

const Sequelize = require('sequelize');
const instance = new Sequelize(DATABASE_URL);

module.exports = { Sequelize, instance };