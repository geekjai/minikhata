//pro_manufactures.js
const Sequelize = require('sequelize');
const sequelize = require('../../config/dbConfig');
const moment = require('moment');

const SCHEMA = sequelize.define('pro_manufactures',
    {
        manufactureId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        manufactureQuantity: Sequelize.REAL,
        manufactureCost: Sequelize.REAL,
        manufactureDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        manufactureNotes: Sequelize.TEXT
    }
);

const queryProdPurManufCostQty = () => {
    return `
    SELECT 
    pur.purchaseId AS purchaseId,
    pur.productId AS productId,
    pur.purchaseQuantity AS purchaseQuantity,
    pur.amountBeforeTax AS amountBeforeTax,
    pur.gstAmount AS gstAmount,
    pur.discountAmount AS discountAmount,
    pur.payableAmount AS payableAmount,
    ppmm.inQuantity AS inQuantity,
    ppmm.outQuantity AS outQuantity,
    pmm.productQuantity AS manufactureQuantity
    FROM pro_purchases pur,
    pro_purchase_manufacture_maps ppmm,
    pro_manufactures manuf,
    pro_product_manufacture_maps pmm
    WHERE ppmm.productId = pur.productId
    AND ppmm.purchaseId = pur.purchaseId
    AND ppmm.manufactureId = manuf.manufactureId
    AND pmm.manufactureId = ppmm.manufactureId
    AND pmm.productId = ppmm.productId
    AND pmm.manufactureId = manuf.manufactureId
    AND manuf.manufactureId IN (:bindManufactureId)  
    `
}

const execProdPurManufCostQty = (t, manufactureId) => {
    return sequelize.query(queryProdPurManufCostQty(),
        {
            replacements: { bindManufactureId: [manufactureId] },
            type: Sequelize.QueryTypes.SELECT,
            transaction: t
        }
    );
}


const createManufacture = (t, pManufacture) => {

    return SCHEMA.create(pManufacture, { transaction: t })
}

const updateManufactureCost = (t, pManufactureId, pManufactureCost) => {
    return SCHEMA.update({ manufactureCost: pManufactureCost }, {
        where: {
            manufactureId: pManufactureId
        },
        transaction: t
    });
}

const processManufactureRequest = (isCreate, isUpdate, requestBody) => {

    if (requestBody == undefined) {
        return {};
    }

    let lManufactureDate = requestBody.manufactureDate;
    if (lManufactureDate !== undefined) {
        const d = new Date(lManufactureDate);
        lManufactureDate = moment(d).format('YYYY-MM-DD');
    }

    if (isUpdate) {
        return {
            manufactureQuantity: requestBody.manufactureQuantity,
            manufactureDate: lManufactureDate,
            manufactureNotes: requestBody.manufactureNotes
        }
    }

    if (isCreate) {
        return {
            manufactureQuantity: requestBody.manufactureQuantity,
            manufactureDate: lManufactureDate,
            manufactureNotes: requestBody.manufactureNotes
        }
    }

    return {};
}

module.exports = {
    processManufactureRequest,
    createManufacture,
    execProdPurManufCostQty,
    updateManufactureCost
};