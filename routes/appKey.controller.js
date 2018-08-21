const express = require('express');
const router = express.Router();
const appKeyService = require('../app/services/appkey.service')

router.get('/:appName/:key', function(req, res) {

    if (req.params.appName && req.params.key) {
        appKeyService.setDB(req.db);
        appKeyService.save(req.params.key, req.params.appName).then(function (body) {
            res.send(body);
        });
    }
});

router.get('/:appName', function(req, res) {

    if (req.params.appName) {
        appKeyService.setDB(req.db);
        appKeyService.findByAppName(req.params.appName).then(function (body) {
            res.send(body);
        });
    }
});

module.exports = router;