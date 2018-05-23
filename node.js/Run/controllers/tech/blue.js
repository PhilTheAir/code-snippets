var Promise = require('bluebird');
var mongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;

var dbUrl = 'mongodb://localhost:27017/test';

var async = require('async');

async.waterfall([ function(done) {
  mongoClient.connectAsync(dbUrl)
  .then((db) => {
    return db.collection('stocknames').findAsync({});
  })
  .then((cursor) => {
    return cursor.toArrayAsync();
  })
  .then((arr) => {
    done(null, arr);
  })
  .catch(function(err) {
    throw err;
  });
},
function(arr, done) {
  console.log('xxx', arr);
}],
function(err, result)
{
    if (err) { return console.error(err); }
    else { console.log(result); }
});


