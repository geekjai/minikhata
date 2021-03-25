var express = require('express');
var router = express.Router();
var Promise = require('promise');
const moment = require('moment');
const manufactureService = require('../data/service/manufactureService');

router.post('/api/createManufacture', function (req, res) {
    manufactureService.createManufacture(req.body).then(() => {
        res.send({ success: 'Yes' });
    })
});

module.exports = router;