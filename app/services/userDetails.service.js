const Q = require('q');
const ObjectId = require('mongodb').ObjectId;
var db = null;
const COLLECTION = 'UserDetails';

function save(userDetails) {
    var deferred = Q.defer();

    db.collection(COLLECTION).insertOne({
        userId: userDetails.userId,
        lat: userDetails.lat,
        lon: userDetails.lon,
        appName: userDetails.appName,
        appId: userDetails.appId,
        date: userDetails.date
    }).then(function (result) {
        deferred.resolve(result);
    })

    return deferred.promise;
}

function list(userDetails) {
    var deferred = Q.defer();

    var cursor = db.collection(COLLECTION).find({
    }, {})
        .toArray(function(err, results) {
            deferred.resolve(results);
        });

    return deferred.promise;
}

var remove = function(keys) {
    var deferred = Q.defer();

    keys.forEach(function (key, index){
        db.collection(COLLECTION, function(err, collection) {
            db.collection(COLLECTION).deleteOne({_id: ObjectId(key)}).then(function () {
                if(index == keys.length-1) {
                    deferred.resolve();
                }
            });
        });
    });

    return deferred.promise;
};

module.exports = {
    save: save,
    list: list,
    remove: remove,
    setDB: function(reqDB){
        db = reqDB
    }
}