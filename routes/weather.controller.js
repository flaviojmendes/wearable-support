const express = require('express');
const router = express.Router();
const openWeatherService = require('../app/services/openweather.service')

router.get('/:lat/:lon', function(req, res, next) {

    if (req.params.lat && req.params.lon) {
        res.setHeader('Content-Type', 'application/json')
        openWeatherService.setDB(req.db)
        openWeatherService.retrieveWeather(req.params.lat, req.params.lon).then(function (body) {
            res.send(body);
        });
    }
});

module.exports = router;