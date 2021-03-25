//pro_products.js
const Sequelize = require('sequelize');
const sequelize = require('../../config/dbConfig');

const SCHEMA = sequelize.define('pro_products',
    {
        productId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        productCode: Sequelize.STRING,
        productBarcode: Sequelize.STRING,
        productName: Sequelize.STRING,
        description: Sequelize.TEXT,
        productLink: Sequelize.STRING,
        productImage: Sequelize.BLOB,

        categoryId: Sequelize.INTEGER,
        subCategoryId: Sequelize.INTEGER
    }
);

module.exports = {
    SCHEMA
};