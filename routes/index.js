var express = require('express');
var router = express.Router();
const METRICUNIT = require('../data/schemas/proMetricUnits');
/* GET home page. */
router.get('/', function(req, res, next) {
  METRICUNIT.SCHEMA.findAll().then(dbMetricUnits => {
    console.log(dbMetricUnits);
    res.render('index', { title: 'Mini Khata' , metricUnits: dbMetricUnits});
  });
});

module.exports = router;
