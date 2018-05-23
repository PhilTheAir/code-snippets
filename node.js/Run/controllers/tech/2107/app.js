var events = require('events');
var eventEmitter = new events.EventEmitter();
var Promise = require('bluebird');
var mongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;
var log4js = require('log4js');

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: '../logs/app.log' }
  ]
});
var logger = log4js.getLogger();

var dbUrl = 'mongodb://localhost:27017/test';
var nameDb = 'stocknames';
var nameList = [];
var inNDays = 3;
var tacticsDb = 't2007';  // 最近两日红盘下跌，量比大于等于1.5

eventEmitter.on('getStockList', () => {
  mongoClient.connectAsync(dbUrl)
  .then((db) => {
    return db.collection(nameDb).findAsync();
  })
  .then((cursor) => {
    return cursor.toArrayAsync();
  })
  .then((arr) => {
    nameList = arr;
    logger.info('Got stock name list from:', nameDb);
    return eventEmitter.emit('analyzeStocks');
  })
  .catch((err) => { throw err; })
});

eventEmitter.on('analyzeStocks', () => {
  if (nameList.length > 0) {
    var code = nameList.shift().code;
    mongoClient.connectAsync(dbUrl)
    .then((db) => {
      return db.collection(code + 'v').find().sort({d:-1}).limit(inNDays).toArrayAsync();
    })
    .then((arr) => {
      if (arr.length === 3) {
        if ((parseFloat(arr[0].pc) < -0.04 && arr[0].cl === 'red') || 
          (parseFloat(arr[0].pc) < 0 && arr[0].cl === 'red' && parseFloat(arr[1].pc) < 0 && arr[1].cl === 'red') || 
          (parseFloat(arr[0].pc) < 0 && arr[0].cl === 'red' && arr[1].cl === 'green' && arr[2].cl === 'green')) {
          // logger.info(arr)
          logger.info(tacticsDb, {d: arr[0].d, code: code}, 'analyzeStocks');
        }
        eventEmitter.emit('analyzeStocks');
      }
      else {
        eventEmitter.emit('analyzeStocks');
      }
    })
  }
  else {
    logger.info('Analysis complete:', tacticsDb);
    process.exit();
  }
});

eventEmitter.emit('getStockList');

var insertObjOrArray = (dbName, obj, e) => {
  if (Array.isArray(obj) && obj.length === 0) {
    logger.info('No data in stock', dbName);
    eventEmitter.emit(e);
  }
  else {
    mongoClient.connectAsync(dbUrl)
    .then((db) => {
      return db.collection(dbName).insertAsync(obj);
    })
    .then(() => {
        var l = Array.isArray(obj) ? obj.length : 1;
        logger.info('Inserted', l, 'document(s) into', dbName, 'collection.');
        eventEmitter.emit(e);
    })
    .catch(function(err) {
      throw err;
    });
  }
}
