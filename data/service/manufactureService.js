const executeTransaction = require('../../config/executeTransaction');
const proManufactures = require('../schemas/proManufactures');
const proProductManufactureMap = require('../schemas/proProductManufactureMap');
const proPurchaseManufactureMap = require('../schemas/proPurchaseManufactureMap');

const createManufacture = (requestBody) => {
    //requestBody.products []
    let data = proManufactures.processManufactureRequest(true, false, requestBody);
    return executeTransaction(async (t) => {

        let manufacturResult = await proManufactures.createManufacture(t, data);
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

        await proProductManufactureMap.bulkCreateProductManufactureMap(t, proManu);
        let jsonObj = await proPurchaseManufactureMap
            .processPurchaseManufactureData(t, productList, proManu);
        let purchManufList = [];
        let consumedPurchaseList = [];
        purchManufList = jsonObj.purchaseManufactureList;
        consumedPurchaseList = jsonObj.consumedPurchaseList;

        await proPurchaseManufactureMap.bulkCreatePurchaseManufactureMap(t, purchManufList);
        return;
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