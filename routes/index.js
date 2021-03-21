var express = require('express');
var router = express.Router();
const METRICUNIT = require('../data/schemas/pro_metric_units');
/* GET home page. */
router.get('/', function(req, res, next) {
  METRICUNIT.findAll().then(dbMetricUnits => {
    console.log(dbMetricUnits);
    res.render('index', { title: 'Mini Khata' , metricUnits: dbMetricUnits});
  });
});

module.exports = router;
