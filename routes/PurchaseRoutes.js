var express = require('express');
var router = express.Router();
var Promise = require('promise');
const moment = require('moment');
const productService = require('../data/service/productService');
const purchaseService = require('../data/service/purchaseService');

router.get('/viewPurchases', function (req, res, next) {
  res.render('purchase', { ViewPurchases: true });
});

/* Render create purchase. */
router.get('/createPurchase', function (req, res, next) {
  Promise
    .all([productService.fetchAll()])
    .then(responses => {
      res.render('purchase',
        {
          products: responses[0],
          CreatePurchase: true,
          purchase: {},
          actionId: 'createPurchase'
        });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/editPurchase/:purchaseId', async function (req, res) {

  // Retrieve the purchaseId from our URL path
  var id = req.params.purchaseId;
  Promise
    .all([
      productService.fetchAll(),
      purchaseService.searchPurchaseByPurchaseId(id)
    ])
    .then(responses => {
      let purchaseDate = responses[1][0].purchaseDate;
      const d = new Date(purchaseDate);
      responses[1][0].purchaseDate = moment(d).format('YYYY-MM-DD');
      res.render('purchase',
        {
          products: responses[0],
          EditPurchase: true,
          purchase: responses[1][0],
          actionId: 'editPurchase'
        }
      );
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/api/purchaseRecords', function (req, res, next) {
  Promise
    .all([purchaseService.fetchAllPurchases()])
    .then(responses => {
      res.send(responses[0]);
    })
    .catch(err => {
      console.log(err);
    });
});

/* POST new purchase. */
router.post('/api/createPurchase', function (req, res) {
  purchaseService.createPuchase(req.body).then(() => {
    res.send({ success: 'Yes' });
  })
});

/* PUT update existing purchase. */
router.put('/api/editPurchase', function (req, res) {
  let purchaseId = req.body.purchaseId;
  let data = req.body;
  purchaseService.updatePurchaseByPurchaseId(purchaseId, data)
    .then((response) => {
      res.sendStatus(200);
    });
});

/* Delete existing purchase. */
router.delete('/api/deletePurchase/:purchaseId', function (req, res) {
  let purchaseId = req.params.purchaseId;
  purchaseService.deleteByPurchaseId(purchaseId)
    .then((purchase) => {
      res.sendStatus(200);
    });
});

module.exports = router;