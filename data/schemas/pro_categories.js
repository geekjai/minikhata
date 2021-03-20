//pro_categories.js
const Sequelize = require('sequelize');
const sqlite = require('../../config/sqlite');

const CATEGORY = sqlite.define('pro_categories',
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

module.exports = CATEGORY;