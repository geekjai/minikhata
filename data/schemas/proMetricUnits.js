//pro_metric_units.js
const Sequelize = require('sequelize');
const sequelize = require('../../config/dbConfig');

const SCHEMA = sequelize.define('pro_metric_units',
    {
        metricId : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        unitType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        unitName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        unitSymbol : {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);

module.exports = {
    SCHEMA
};