const executeTransaction = require('../../config/executeTransaction');
const PURCHASE = require('../schemas/proPurchases');
const PurchaseManufactureMap = require('../schemas/proPurchaseManufactureMap');

const createPuchase = (requestBody) => {
    let data = PURCHASE.processPurchaseRequest(true, false, requestBody);
    return executeTransaction((t) => {
        // chain all your queries here. make sure you return them.
        return PURCHASE.SCHEMA.create(data, { transaction: t })
            .then((purchaseResult) => {
                return PurchaseManufactureMap
                    .createPurchaseManufactureMap(t,
                        {
                            productId: purchaseResult.productId,
                            purchaseId: purchaseResult.purchaseId,
                            inQuantity: purchaseResult.purchaseQuantity
                        }
                    );
            });
    }).then(function (result) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
}

const searchPurchaseByPurchaseId = (pPurchaseId) => {
    return PURCHASE.findAllByPurchaseId(null, pPurchaseId);
}

const searchPurManufQtyByPurchaseIds = (pPurchaseIds) => {
    return PurchaseManufactureMap.execFindPurManufQtyByPurchaseIds(null, pPurchaseIds);
}

module.exports = {
    createPuchase,
    searchPurchaseByPurchaseId,
    searchPurManufQtyByPurchaseIds
}