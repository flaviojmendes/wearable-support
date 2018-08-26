const express = require('express');
const router = express.Router();
const appKeyService = require('../app/services/appkey.service')

router.post('/:appName', function(req, res) {

    if (req.params.appName) {
        appKeyService.setDB(req.db);
        appKeyService.save(req.params.appName, req.body.keys).then(function (body) {
            res.send(body);
        });
    }
});

router.delete('/:appName', function(req, res) {

    if (req.params.appName) {
        appKeyService.setDB(req.db);
        appKeyService.remove(req.body.keys).then(function (body) {
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