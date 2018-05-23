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
var inNDays = 10;
var tacticsDb = 't1117';  // 最后一日交易量变化率 >= 1.5，最后一日跌幅为近 10 日内最大跌幅

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
      if (arr.length > 1 && arr[1].vc >= '1.5') {
        var pc = parseFloat(arr[1].pc);
        var a = [];
        for (var i = 0, l = arr.length; i < l; i ++ ) {
          a.push(parseFloat(arr[i].pc));
        }
        a.sort(function(a, b){return a - b});
        if (a.indexOf(pc) <= 1) {
          logger.info(a)
          logger.info(pc)
          logger.info(a.indexOf(pc))
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
