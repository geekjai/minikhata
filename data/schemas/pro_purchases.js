//pro_products.js
const Sequelize = require('sequelize');
const sqlite = require('../../config/sqlite');
const moment = require('moment');

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


const calculatePayableAmount = (amountBeforeTax, gstAmount, discountAmount) => {

    let payableAmount = 0;

    if (!amountBeforeTax.trim() == false && !isNaN(amountBeforeTax))
        payableAmount = payableAmount + parseFloat(amountBeforeTax);
    if (!gstAmount.trim() == false && !isNaN(gstAmount))
        payableAmount = payableAmount + parseFloat(gstAmount);
    if (!discountAmount.trim() == false && !isNaN(discountAmount))
        payableAmount = payableAmount - parseFloat(discountAmount);

    return payableAmount;
}

const processPurchaseRequest = (isCreate, isUpdate, requestBody) => {

    if (requestBody == undefined) {
        return {};
    }

    let lPurchaseDate = requestBody.purchaseDate;
    if (lPurchaseDate !== undefined) {
        const d = new Date(lPurchaseDate);
        lPurchaseDate = moment(d).format('YYYY-MM-DD');
    }
    let lPayableAmount = calculatePayableAmount(requestBody.amountBeforeTax, requestBody.gstAmount, requestBody.discountAmount);

    if (isUpdate) {
        return {
            purchaseQuantity: requestBody.purchaseQuantity,
            purchaseNotes: requestBody.purchaseNotes,
            amountBeforeTax: requestBody.amountBeforeTax,
            gstAmount: requestBody.gstAmount,
            discountAmount: requestBody.discountAmount,
            payableAmount: lPayableAmount,
            purchaseDate: lPurchaseDate,
            isAmountSettled: requestBody.isAmountSettled
        }
    }

    if (isCreate) {
        return {
            productId: requestBody.productId,
            billNumber: requestBody.billNumber,
            purchaseQuantity: requestBody.purchaseQuantity,
            purchaseNotes: requestBody.purchaseNotes,
            amountBeforeTax: requestBody.amountBeforeTax,
            gstAmount: requestBody.gstAmount,
            discountAmount: requestBody.discountAmount,
            payableAmount: lPayableAmount,
            purchaseDate: lPurchaseDate,
            isAmountSettled: requestBody.isAmountSettled
        }
    }

    return {};
}

module.exports = {
    SCHEMA,
    execFindAll,
    calculatePayableAmount,
    processPurchaseRequest
};