const manufactureService = require('../data/service/manufactureService');

const dataCreateManufacture = {
    "manufactureQuantity": "5",
    "manufactureDate": "2021-03-25",
    "manufactureNotes": "Great",
    "products": [
        {
            "productId": "1",
            "productQuantity": "5"
        }
    ]
}

manufactureService.createManufacture(dataCreateManufacture).then(() => {
    console.log("success");
})