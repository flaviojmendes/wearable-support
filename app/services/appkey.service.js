const Q = require('q');
var db = null;


function save(key, appName) {
    var deferred = Q.defer();
    db.collection('AppKey').insertOne({
        key: key,
        appName: appName
    }).then(function (result) {
        deferred.resolve(result);
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




module.exports = {
    save: save,
    findByAppName: findByAppName,
    setDB: function(reqDB){
        db = reqDB
    }
}