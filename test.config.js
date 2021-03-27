'use strict';
const fs = require('fs');
const jest = require('jest');
const purchaseService = require('./data/service/purchaseService');
const manufactureService = require('./data/service/manufactureService');
const deployLogService = require('./data/service/deployLogService');

const runManufactureService = async () => {

    const logs = await deployLogService.fetchTestConfigJsLog();
    if (logs !== undefined && logs instanceof Array && logs.length == 1) {
        let log = logs[0];
        if (log.status === 'Y') {
            return;
        }
    }
    let purchases = null;
    let manufactureRaw = null;
    let purchaseData = null;
    let purchaseIds = [];

    let rawdata = await fs.readFileSync('./__json__/purchase.spec.json');
    purchases = JSON.parse(rawdata);

    purchaseData = await purchaseService
        .searchPurchaseByPurchaseId(purchases[0].purchaseId);
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

    //now create manufacturing records
    manufactureRaw = await fs.readFileSync('./__json__/manufacture.spec.json');
    manufactureRaw = JSON.parse(manufactureRaw);
    await manufactureService.createManufacture(manufactureRaw);
    await deployLogService.createTestConfigJsLog();
}

runManufactureService();