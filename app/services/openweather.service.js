// const ObjectId = require('mongodb').ObjectId;
// var MongoClient = require('mongodb').MongoClient;
// var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL || "mongodb://localhost:27017/scoreboard";
//
//
// MongoClient.connect(mongoURL, function(err, db) {
//     if(!err) {
//         console.log("We are connected");
//     }
// });

const request = require('request')
const Q = require('q')

const url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&lat={lat}&lon={lon}&appid={appid}"

function retrieveWeather(lat, lon, callback) {
    let repURL = url.replace('{lat}', lat).replace('{lon}', lon).replace('{appid}', '1455382c9be6c3db4fe8f894230202b7')
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


       callback(null, weather);
    });
}





module.exports = {
    retrieveWeather: retrieveWeather
}