const Purchases = require('./schemas/proPurchases');
const PurchaseManufactureMap = require('./schemas/proPurchaseManufactureMap');

Purchases.SCHEMA.bulkCreate([
    {
        purchaseId: 1,
        productId: 1,
        billNumber: 'TESTBILL01',
        purchaseQuantity: 10.0,
        purchaseNotes: 'Test Data',

        amountBeforeTax: 100,
        gstAmount: 10,
        discountAmount: 0,
        payableAmount: 110,

        purchaseDate: '2021-03-25',
        isAmountSettled: 'N'
    }
])

PurchaseManufactureMap.SCHEMA.bulkCreate([
    {
        productId: 1,
        purchaseId: 1,
        inQuantity: 10
    }
])