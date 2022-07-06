const { Sequelize } = require('sequelize');
const path = require('path');
const debug = require('debug')('app:sequelize');

const sequelize = new Sequelize('test_AMEX_1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// sequelize
//   .authenticate()
//   .then((res) => debug('We are connected!'))
//   .catch((err) => debug('There was an error', err));

module.exports = sequelize;
