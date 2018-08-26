const Q = require('q');
const ObjectId = require('mongodb').ObjectId;
var db = null;


function save(appName, keys) {
    var deferred = Q.defer();

    keys.forEach(function (key, index){
        db.collection('AppKey').insertOne({
            key: key,
            appName: appName
        }).then(function (result) {
            if(index == keys.length-1) {
                deferred.resolve(result);
            }
        })
    })

    return deferred.promise;
}

var findByAppName = function(appName) {
    var deferred = Q.defer();
    var cursor = db.collection('AppKey').find({'appName': appName}, {})
        .toArray(function(err, results) {
            deferred.resolve(results);
        });

    return deferred.promise;
}

var remove = function(keys) {
    var deferred = Q.defer();

    keys.forEach(function (key, index){
        db.collection('AppKey', function(err, collection) {
            db.collection('AppKey').deleteOne({_id: ObjectId(key)}).then(function () {
                if(index == keys.length-1) {
                    deferred.resolve();
                }
            });
        });
    });

    return deferred.promise;
}

module.exports = {
    save: save,
    findByAppName: findByAppName,
    remove: remove,
    setDB: function(reqDB){
        db = reqDB
    }
}