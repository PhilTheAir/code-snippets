var Promise = require('bluebird');
var mongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;

var dbUrl = 'mongodb://localhost:27017/test';

var dropDb = (dbName) => {
  mongoClient.connectAsync(dbUrl)
  .then((db) => {
    return db.collection(dbName).drop();
  })
  .then(() => {
      console.log('Dropped:', dbName);
  })
  .catch(function(err) {
    throw err;
  });
}

// de.removeDocs('stocknames', {'code': /sh6004/});
// de.removeDocs('stocknames', {'remove': true});
var removeDocs = (dbName, queries) => {
  mongoClient.connectAsync(dbUrl)
  .then((db) => {
    return db.collection(dbName).removeAsync(queries);
  })
  .then(() => {
      console.log('Deleted documents in', dbName, ', deletion condition: ', queries);
  })
  .catch(function(err) {
    throw err;
  });
}

exports.dropDb = dropDb;
exports.removeDocs = removeDocs;


// shell
/*
drop collections:
> db.getCollectionNames().filter(function(name){ return name.match('v') })
.forEach(function(name){ db.getCollection(name).drop(); });

delete one document:
>db.coll.findAndModify({query :{}, sort: {"_id" : -1}, remove:true})
*/