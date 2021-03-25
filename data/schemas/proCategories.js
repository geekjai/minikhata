//pro_categories.js
const Sequelize = require('sequelize');
const sequelize = require('../../config/dbConfig');

const SCHEMA = sequelize.define('pro_categories',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        categoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        categoryName: Sequelize.STRING,
        subCategoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        subCategoryName: Sequelize.STRING
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['categoryId', 'subCategoryId']
            }
        ]
    }
);

module.exports = {
    SCHEMA
};