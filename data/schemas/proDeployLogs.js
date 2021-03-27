//pro_categories.js
const Sequelize = require('sequelize');
const sequelize = require('../../config/dbConfig');

const SCHEMA = sequelize.define('pro_deploy_logs',
    {
        logId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        name: Sequelize.STRING,
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        file: Sequelize.TEXT,
        status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['code']
            }
        ]
    }
);

const createDeployLog = (t, pDeployLog) => {

    return SCHEMA.create(pDeployLog, { transaction: t })
}

const findDeployLogByCode = (t, pCode) => {

    return SCHEMA.findAll({
        limit: 1,
        where: {
            code: pCode
        },
        transaction: t
    });
}

module.exports = {
    createDeployLog,
    findDeployLogByCode
};