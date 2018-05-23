var Promise = require('bluebird');
var mongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;

var dbUrl = 'mongodb://localhost:27017/test';

var insertObjOrArray = (dbName, obj) => {
  mongoClient.connectAsync(dbUrl)
  .then((db) => {
    return db.collection(dbName).insertAsync(obj);
  })
  .then(() => {
      var l = Array.isArray(obj) ? obj.length : 1;
      console.log('Inserted', l, ' document(s) into', dbName, 'collection.');
  })
  .catch(function(err) {
    throw err;
  });
}

exports.insertObjOrArray = insertObjOrArray;