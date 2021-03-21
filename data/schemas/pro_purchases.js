//pro_products.js
const Sequelize = require('sequelize');
const sqlite = require('../../config/sqlite');

const PURCHASE = sqlite.define('pro_purchases',
    {
        purchaseId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        productId: Sequelize.INTEGER,
        billNumber : {
            type: Sequelize.STRING,
            allowNull: false
        },
        purchaseQuantity: Sequelize.REAL,
        purchaseNotes : Sequelize.TEXT,
        
        amountBeforeTax : Sequelize.REAL,
        gstAmount: Sequelize.REAL,
        discountAmount : Sequelize.REAL,
        payableAmount : Sequelize.REAL,

        purchaseDate : Sequelize.DATE,
        isAmountSettled : Sequelize.STRING
    }
);

module.exports = PURCHASE;