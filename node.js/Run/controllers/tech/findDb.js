var Promise = require('bluebird');
var mongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;

var dbUrl = 'mongodb://localhost:27017/test';

var findObj = (dbName, queryObj) => {
  mongoClient.connectAsync(dbUrl)
  .then((db) => {
    return db.collection(dbName).findAsync(queryObj);
  })
  .then((cursor) => {
    return cursor.toArrayAsync();
  })
  .catch(function(err) {
    throw err;
  });
}

exports.findObj = findObj;