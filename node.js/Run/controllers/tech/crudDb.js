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
  .then((arr) => {
    console.log(arr);
  })
  .catch(function(err) {
    throw err;
  });
}

var findObjsTopN = (dbName, queryObj, n) => {
  mongoClient.connectAsync(dbUrl)
  .then((db) => {
    return db.collection(dbName).find(queryObj).sort({'_id':-1}).limit(n);
  })
  .then((cursor) => {
    return cursor.toArrayAsync();
  })
  .then((arr) => {
    console.log(arr);
  })
  .catch(function(err) {
    throw err;
  });
}

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


exports.findObj = findObj;
exports.findObjsTopN = findObjsTopN;
exports.insertObjOrArray = insertObjOrArray;
exports.upsertObj = upsertObj;
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