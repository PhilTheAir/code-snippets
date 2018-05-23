var Promise = require('bluebird');
var mongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;

var dbUrl = 'mongodb://localhost:27017/test';

var upsertObj = (dbName, queryObj, updateObj) => {
  mongoClient.connectAsync(dbUrl)
  .then((db) => {
    return db.collection(dbName).updateAsync(queryObj, updateObj, { upsert: true });
  })
  .then(() => {
    console.log('Updated', queryObj, 'with', updateObj, 'in', dbName, 'collection.');
  })
  .catch(function(err) {
    throw err;
  });
}

exports.upsertObj = upsertObj;