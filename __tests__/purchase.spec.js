'use strict';
const fs = require('fs');
const purchaseService = require('../data/service/purchaseService');

describe("Verify Purchase flow", () => {

    let purchases = null;
    let purchaseData = null;
    let purchaseIds = [];
    beforeAll(async () => {
        let rawdata = await fs.readFileSync('./__json__/purchase.spec.json');
        purchases = JSON.parse(rawdata);

        purchaseData = await purchaseService
            .searchPurchaseByPurchaseId(purchases[0].purchaseId);

        /*
        //check item existence if not create it    
        if (purchaseData == undefined || purchaseData.length == 0) {
            //.forEach (other methods that don't go together with async/await are .map, .filter and .reduce
            for (let i = 0; i < purchases.length; i++) {
                await purchaseService.createPuchase(purchases[i]);
                purchaseIds.push(purchases[i].purchaseId);
            }

            purchaseData = await purchaseService
                .searchPurchaseByPurchaseId(purchases[0].purchaseId);
        }
        */
    });

    // test stuff
    test("Total count of inserted test data", () => {
        // actual test
        expect(purchaseData.length).toBe(1);
    });

    // test stuff
    test("Verify data in pro_purchase_manufacture_map tbl", () => {
        // actual test
        purchaseService.searchPurManufQtyByPurchaseIds(purchaseIds)
            .then((response) => {
                expect(response.length).toBe(purchaseIds.length);
                for (let i = 0; i < response.length; i++) {
                    let row = response[i];
                    if (row.productId == 1) {
                        expect(row.inQuantity).toBe(5);
                        expect(row.outQuantity).toBe(0);
                    }
                }
            });
    });

});
