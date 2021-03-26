//proPurchaseManufactureMap.js
const Sequelize = require('sequelize');
const sequelize = require('../../config/dbConfig');

const findProdPurchaseQuantity =
    `SELECT 
    pur.purchaseId AS purchaseId, 
    pur.productId AS productId,
    sum(pmm.inQuantity) AS inQuantity, 
    coalesce(sum(outQuantity), 0) AS outQuantity 
FROM pro_purchases pur, pro_purchase_manufacture_maps pmm
WHERE pur.productId = pmm.productId
AND pur.purchaseId = pmm.purchaseId
AND pur.isConsumed = 'N'
AND pur.productId IN(:bindProducts)
GROUP BY pur.purchaseId, pur.productId`;

const execFindProdPurchaseQuantity = (t, products) => {
    return sequelize.query(findProdPurchaseQuantity,
        {
            replacements: { bindProducts: products },
            type: Sequelize.QueryTypes.SELECT,
            transaction: t
        }
    );
}

const findPurManufQtyByPurchaseIds = `
SELECT 
    pur.purchaseId AS purchaseId, 
    pur.productId AS productId,
    sum(pmm.inQuantity) AS inQuantity, 
    coalesce(sum(outQuantity), 0) AS outQuantity 
FROM pro_purchases pur, pro_purchase_manufacture_maps pmm
WHERE pur.productId = pmm.productId
AND pur.purchaseId = pmm.purchaseId
AND pur.purchaseId IN(:bindPurchaseIds)
GROUP BY pur.purchaseId, pur.productId`;

const execFindPurManufQtyByPurchaseIds = (t, purchases) => {
    return sequelize.query(findPurManufQtyByPurchaseIds,
        {
            replacements: { bindPurchaseIds: purchases },
            type: Sequelize.QueryTypes.SELECT,
            transaction: t
        }
    );
}

const SCHEMA = sequelize.define('pro_purchase_manufacture_map',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        purchaseId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        inQuantity: Sequelize.REAL,
        manufactureId: {
            type: Sequelize.INTEGER
        },
        outQuantity: Sequelize.REAL
    }
);
/**
 * 
 * @param {*} t 
 * @param {*} productList = []
 * @param {*} productManufList = {
                manufactureId: manufacturResult.manufactureId,
                productId: element.productId,
                productQuantity: element.productQuantity
            }
 */
const processPurchaseManufactureData = (t, productList, productManufList) => {
    /** purManuResult = 
    [
        { purchaseId: 1, productId: 1, inQuantity: 10, outQuantity: 0 },
        { purchaseId: 2, productId: 1, inQuantity: 10, outQuantity: 0 }
    ]
     */
    let purchManufList = [];
    let consumedPurchaseList = [];
    return execFindProdPurchaseQuantity(t, productList)
        .then((purManuResult) => {
            purManuResult.forEach(element => {
                let xfactor = element.inQuantity - element.outQuantity;
                if (xfactor <= 0) {
                    return;
                }
                for (let i = 0; i < productManufList.length; i++) {
                    let curRow = productManufList[i];
                    console.log(curRow);
                    //curRow = { manufactureId: 2, productId: '1', productQuantity: '5' }
                    if (curRow.productId == element.productId) {
                        let curQuantity = 0;
                        let remain = element.inQuantity - element.outQuantity;
                        if (remain >= curRow.productQuantity) {
                            curQuantity = curRow.productQuantity;
                            curRow.productQuantity = curRow.productQuantity - curQuantity;
                        } else {
                            curQuantity = remain;
                            curRow.productQuantity = curRow.productQuantity - curQuantity;
                        }
                        //console.log("curQuantity: " + curQuantity);
                        //console.log("remain: " + remain);
                        //console.log("curRow.productQuantity: " + curRow.productQuantity);
                        //console.log("element.purchaseId: " + element.purchaseId);
                        let obj = {
                            manufactureId: curRow.manufactureId,
                            productId: curRow.productId,
                            purchaseId: element.purchaseId,
                            outQuantity: curQuantity
                        }
                        console.log(obj);
                        purchManufList.push(obj);
                        if (curQuantity == remain) {
                            consumedPurchaseList.push(element.purchaseId);
                        }
                        if (curRow.productQuantity <= 0) {
                            productManufList.splice(i, 1);
                            console.log("?????????????????????????? " + productManufList.length);
                            break;
                        }
                    }
                }
            });

            return {
                purchaseManufactureList: purchManufList,
                consumedPurchaseList: consumedPurchaseList
            }
        })
}

module.exports = {
    SCHEMA,
    processPurchaseManufactureData,
    execFindPurManufQtyByPurchaseIds
};