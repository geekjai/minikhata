//pro_products.js
const Sequelize = require('sequelize');
const sqlite = require('../../config/sqlite');

const findAllQuery = `SELECT pd.productName, pu.* 
                        FROM pro_purchases pu, pro_products pd 
                        WHERE pd.productId = pu.productId`;
const execFindAll = () => {
    return sqlite.query(findAllQuery, { type: Sequelize.QueryTypes.SELECT });
}

const SCHEMA = sqlite.define('pro_purchases',
    {
        purchaseId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        productId: Sequelize.INTEGER,
        billNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        purchaseQuantity: Sequelize.REAL,
        purchaseNotes: Sequelize.TEXT,

        amountBeforeTax: Sequelize.REAL,
        gstAmount: Sequelize.REAL,
        discountAmount: Sequelize.REAL,
        payableAmount: Sequelize.REAL,

        purchaseDate: Sequelize.DATE,
        isAmountSettled: Sequelize.STRING
    }
);

module.exports = {
    SCHEMA,
    execFindAll
};