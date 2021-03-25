const { Transaction } = require('sequelize');
const sequelize = require('./dbConfig');

const executeTransaction = (callBack) => {
    return sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
    }, (t) => callBack(t));
};

module.exports = executeTransaction