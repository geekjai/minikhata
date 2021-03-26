'use strict';
const fs = require('fs');
const purchaseService = require('../data/service/purchaseService');
const Promise = require('promise');

describe("Verify Purchase flow", () => {

    let purchases = null;
    let purchaseData = null;
    beforeAll(async () => {
        let rawdata = await fs.readFileSync('./__json__/purchase.spec.json');
        purchases = JSON.parse(rawdata);
        //.forEach (other methods that don't go together with async/await are .map, .filter and .reduce
        for (let i = 0; i < purchases.length; i++) {
            await purchaseService.createPuchase(purchases[i]);
        }

        purchaseData = await purchaseService
            .searchPurchaseByPurchaseId(purchases[0].purchaseId);
    });

    // test stuff
    test("Total count of inserted test data is 1", () => {
        // actual test
        expect(purchaseData.length).toBe(1);
    });

});
