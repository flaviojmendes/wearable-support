const express = require('express');
const router = express.Router();
const openWeatherService = require('../app/services/openweather.service')
const userDetailsService = require('../app/services/userDetails.service')

router.get('/:lat/:lon/:appId/:userId/', function(req, res, next) {

    if (req.params.lat && req.params.lon) {
        res.setHeader('Content-Type', 'application/json')
        openWeatherService.setDB(req.db)
        openWeatherService.retrieveWeather(req.params.lat, req.params.lon)
            .then(function (body) {

                if(req.params.appId && req.params.userId) {
                    userDetailsService.setDB(req.db)
                    let userDetails = {};
                    userDetails.userId = req.params.userId;
                    userDetails.lat = req.params.lat;
                    userDetails.lon = req.params.lon;
                    userDetails.appName = 'OPENWEATHER';
                    userDetails.appId = req.params.appId;
                    userDetails.date = new Date();
                    userDetailsService.save(userDetails).then(
                        function(body) {
                            res.send(body);
                        }
                    );
                }
            });
    }
});

module.exports = router;