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
      PRODUCT.SCHEMA.findAll(),
      PURCHASE.SCHEMA.findAll({
        where: {
          purchaseId: id
        },
        raw: true
      })
    ])
    .then(responses => {
      console.log(responses[1]);
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

/* POST new purchase. */
router.post('/api/editPurchase', function (req, res) {
  PURCHASE.SCHEMA.findByPk(req.body.purchaseId).then(function (purchase) {
    purchase.update({
      purchaseQuantity: req.body.purchaseQuantity,
      purchaseNotes: req.body.purchaseNotes,
      amountBeforeTax: req.body.amountBeforeTax,
      gstAmount: req.body.gstAmount,
      discountAmount: req.body.discountAmount,
      payableAmount: req.body.payableAmount,
      purchaseDate: req.body.purchaseDate,
      isAmountSettled: req.body.isAmountSettled
    }).then((purchase) => {
      res.send({ success: 'Yes' });
    });
  });
});

module.exports = router;
