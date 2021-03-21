var express = require('express');
var router = express.Router();
var Promise = require('promise');
const PRODUCT = require('../data/schemas/pro_products');
const PURCHASE = require('../data/schemas/pro_purchases');

router.get('/viewPurchases', function (req, res, next) {
  Promise
    .all([PRODUCT.findAll()])
    .then(responses => {
      res.render('purchase', { title: 'Mini Khata', products: responses[0] });
    })
    .catch(err => {
      console.log(err);
    });
});

/* POST new purchase. */
router.post('/createPurchase', function (req, res) {
  PURCHASE.create(req.body);
  res.send({ success: 'Yes' });
});

module.exports = router;
