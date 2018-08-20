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


var retrieveWeather = function() {
    return '{"var": "test"}'
}

module.exports = {
    retrieveWeather: retrieveWeather
}