const { Transaction } = require('sequelize');
const sequelize = require('../../config/dbConfig');
const executeTransaction = require('../../config/executeTransaction');

const proManufactures = require('../schemas/proManufactures');
const proProductManufactureMap = require('../schemas/proProductManufactureMap');
const proPurchaseManufactureMap = require('../schemas/proPurchaseManufactureMap');
const proPurchases = require('../schemas/proPurchases');

const findProdPurchaseQuantity = (t,) => {

}
const createManufacture = (requestBody) => {
    //requestBody.products []
    let data = proManufactures.processManufactureRequest(true, false, requestBody);
    let purchManufList = [];
    let consumedPurchaseList = [];
    return executeTransaction((t) => {
        // chain all your queries here. make sure you return them.
        return proManufactures.SCHEMA.create(data, { transaction: t })
            .then((manufacturResult) => {
                let productList = [];
                let proManu = [];
                if (requestBody.products !== undefined
                    && requestBody.products instanceof Array) {
                    requestBody.products.forEach(element => {
                        let obj = {
                            manufactureId: manufacturResult.manufactureId,
                            productId: element.productId,
                            productQuantity: element.productQuantity
                        }
                        proManu.push(obj);
                        productList.push(element.productId);
                    });
                }
                // end of product list processed
                return proProductManufactureMap.SCHEMA.bulkCreate(proManu, { transaction: t })
                    .then(() => {
                        return proPurchaseManufactureMap.processPurchaseManufactureData(t, productList, proManu)
                            .then((jsonObj) => {
                                purchManufList = jsonObj.purchaseManufactureList;
                                consumedPurchaseList = jsonObj.consumedPurchaseList;
                                return proPurchaseManufactureMap.SCHEMA.bulkCreate(purchManufList, { transaction: t })
                                    .then(() => {
                                        console.log("success!!!!!!!");
                                    });
                            });
                    });
            });
    }).then(function (result) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
}

module.exports = {
    createManufacture
}