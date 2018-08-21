const Q = require('q')

const request = require('request')
const appKeyService = require('./appkey.service')
var db = null;

const url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&lat={lat}&lon={lon}&appid={appid}"

function retrieveWeather(lat, lon) {
    var deferred = Q.defer();
    appKeyService.setDB(db)
    appKeyService.findByAppName('OPENWEATHER').then(function(appKeys) {
        var appKeyObject = appKeys[Math.floor(Math.random()*appKeys.length)];

        let repURL = url.replace('{lat}', lat).replace('{lon}', lon).replace('{appid}', appKeyObject.key)
        request.get(repURL, (err, res, body) => {
            if(err) {
                return console.dir(err)
            }

            let weather = {};
            let weatherJSON = JSON.parse(body);

            weather.lat = lat;
            weather.lon = lon;
            weather.con = weatherJSON.weather[0].main;
            weather.loc = weatherJSON.name;
            weather.srise = weatherJSON.sys.sunrise;
            weather.sset = weatherJSON.sys.sunset;
            weather.tmpC = (((weatherJSON.main.temp - 32) * 5) / 9).toFixed(1);
            weather.tmpF = weatherJSON.main.temp.toFixed(1);
            weather.hum = weatherJSON.humidity;

            deferred.resolve(weather);
        });
    });
    return deferred.promise;
}





module.exports = {
    retrieveWeather: retrieveWeather,
    setDB: function(reqDB){
        db = reqDB
    }
}