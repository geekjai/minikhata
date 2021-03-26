const Sequelize = require('sequelize');

let nodeEnv = process.env.NODE_ENV;
let loggingFlag = false;
if (nodeEnv === 'development') {
  loggingFlag = true;
}

const sequelize = new Sequelize({
  // The `host` parameter is required for other databases
  // host: 'localhost'
  dialect: 'sqlite',
  storage: './data/minikhata.sqlite',
  logging: loggingFlag
});

module.exports = sequelize;