const express = require('express');
const router = express.Router();
const appKeyService = require('../app/services/userDetails.service')


router.post('/list', function(req, res) {
    if (req.body) {
        appKeyService.setDB(req.db);
        appKeyService.list(req.body).then(function (body) {
            res.send(body);
        });
    }
});


router.post('/add', function(req, res) {
    if (req.body) {
        appKeyService.setDB(req.db);
        appKeyService.save(req.body).then(function (body) {
            res.send(body);
        });
    }
});

router.post('/remove', function(req, res) {
    if (req.body) {
        appKeyService.setDB(req.db);
        appKeyService.remove(req.body.keys).then(function (body) {
            res.send(body);
        });
    }
});


module.exports = router;