const express = require('express');
const router = express.Router();
const openWeatherService = require('../app/services/openweather.service')

router.get('/:lat/:long', function(req, res, next) {

    if(req.params.lat && req.params.long) {
        res.setHeader('Content-Type', 'application/json')
        res.send(openWeatherService.retrieveWeather())
    }
});


module.exports = router;