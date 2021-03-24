var express = require('express');
var router = express.Router();

router.get('/generalform', function (req, res, next) {
    res.render('documentation/GeneralDoc', {});
});

router.get('/generalui', function (req, res, next) {
    res.render('documentation/GeneralUiDoc', {});
});

module.exports = router;