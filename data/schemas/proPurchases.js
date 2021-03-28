//pro_purchases.js
const Sequelize = require('sequelize');
const sequelize = require('../../config/dbConfig');

const SCHEMA = sequelize.define('pro_purchases',
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
        isAmountSettled: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'N'
        },
        isConsumed: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'N'
        }
    }
);

const findAllQuery = `SELECT pd.productName, pu.* 
                        FROM pro_purchases pu, pro_products pd 
                        WHERE pd.productId = pu.productId`;
const execFindAll = () => {
    return sequelize.query(findAllQuery, { type: Sequelize.QueryTypes.SELECT });
}

const bulkUpdateIsConsumedToY = (t, pPurchaseIds) => {
    return SCHEMA.update({ isConsumed: 'Y' }, {
        where: {
            purchaseId: pPurchaseIds
        },
        transaction: t
    });
}

const findAllByPurchaseId = (t, pPurchaseId) => {
    return SCHEMA.findAll({
        where: {
            purchaseId: pPurchaseId
        },
        raw: true,
        transaction: t
    });
}

const deleteByPurchaseId = (t, pPurchaseId) => {
    return SCHEMA.findByPk(pPurchaseId).then(function (purchase) {
        return purchase.destroy();
    });
}

const updatePurchaseByPurchaseId = (t, pPurchaseId, pPurchase) => {
    return SCHEMA.findByPk(pPurchaseId).then(function (purchase) {
        return purchase.update(pPurchase);
    });
}

module.exports = {
    SCHEMA,
    findAllByPurchaseId,
    execFindAll,
    bulkUpdateIsConsumedToY,
    deleteByPurchaseId,
    updatePurchaseByPurchaseId
};