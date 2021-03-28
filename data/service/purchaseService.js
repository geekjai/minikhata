const moment = require('moment');
const executeTransaction = require('../../config/executeTransaction');
const PURCHASE = require('../schemas/proPurchases');
const PurchaseManufactureMap = require('../schemas/proPurchaseManufactureMap');

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
            purchaseDate: lPurchaseDate
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
            purchaseDate: lPurchaseDate
        }
    }

    return {};
}

const createPuchase = (requestBody) => {
    let data = processPurchaseRequest(true, false, requestBody);
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

const fetchAllPurchases = () => {
    return PURCHASE.execFindAll();
}

const deleteByPurchaseId = (pPurchaseId) => {
    return PURCHASE.deleteByPurchaseId(null, pPurchaseId);
}

const updatePurchaseByPurchaseId = (pPurchaseId, pPurchase) => {
    let data = processPurchaseRequest(false, true, pPurchase);
    return PURCHASE.updatePurchaseByPurchaseId(null, pPurchaseId, data);
}

module.exports = {
    createPuchase,
    searchPurchaseByPurchaseId,
    searchPurManufQtyByPurchaseIds,
    fetchAllPurchases,
    processPurchaseRequest,
    deleteByPurchaseId,
    updatePurchaseByPurchaseId
}