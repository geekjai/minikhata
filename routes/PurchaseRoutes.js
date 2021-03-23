var express = require('express');
var router = express.Router();
var Promise = require('promise');
const PRODUCT = require('../data/schemas/pro_products');
const PURCHASE = require('../data/schemas/pro_purchases');

router.get('/viewPurchases', function (req, res, next) {
  res.render('purchase', { ViewPurchases: true });
});

/* Render create purchase. */
router.get('/createPurchase', function (req, res, next) {
  Promise
    .all([PRODUCT.SCHEMA.findAll()])
    .then(responses => {
      res.render('purchase', { products: responses[0], CreatePurchase: true });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/api/purchaseRecords', function (req, res, next) {
  Promise
    .all([PURCHASE.execFindAll()])
    .then(responses => {
      res.send(responses[0]);
    })
    .catch(err => {
      console.log(err);
    });
});

/* POST new purchase. */
router.post('/api/createPurchase', function (req, res) {
  PURCHASE.SCHEMA.create(req.body);
  res.send({ success: 'Yes' });
});

module.exports = router;
