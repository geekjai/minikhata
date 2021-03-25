//pro_manufactures.js
const Sequelize = require('sequelize');
const sequelize = require('../../config/dbConfig');

const SCHEMA = sequelize.define('pro_manufactures',
    {
        manufactureId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        manufactureQuantity: Sequelize.REAL,
        manufactureDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        manufactureNotes: Sequelize.TEXT
    }
);

module.exports = {
    SCHEMA
};