//pro_manufacture_products.js
const Sequelize = require('sequelize');
const sequelize = require('../../config/dbConfig');

const SCHEMA = sequelize.define('pro_manufacture_products',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        manufactureId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productQuantity: Sequelize.REAL
    }
);

module.exports = {
    SCHEMA
};