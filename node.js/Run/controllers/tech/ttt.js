var getData = require('./getHttpContent');
var priceCalculation = require('./priceCalculation');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var Promise = require('bluebird');
var mongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;
var theDate = require('ymd-hms');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/app.log' }
  ]
});
var logger = log4js.getLogger();

var url = 'http://ctxalgo.com/api/stocks';
var dbUrl = 'mongodb://localhost:27017/test';
var nameDb = 'stocknames';
var dateDb = 'latestDate';
var analysisDateDb = 'latestAnalysisDate';
var startDate = '';
var nextStartDate = theDate.nDaysAgo(-1).yyyy_mm_dd();
var endDate = theDate.nDaysAgo(0).yyyy_mm_dd();
var analysisStartDate = '';
var nextAnalysisStartDate = theDate.nDaysAgo(0).yyyy_mm_dd();
var downloadedCode = [];
var deleteCodeSet = [];
var deleteCodeV = [];
var stockUrl = [];

eventEmitter.on('getStartDate', () => {
  mongoClient.connectAsync(dbUrl)
  .then((db) => {
    return db.collection(dateDb).findAsync();
  })
  .then((cursor) => {
    return cursor.toArrayAsync();
  })
  .then((arr) => {
    startDate = arr[0].d;
  })
  .then(() => {
    logger.info('Updating starts from:', startDate);
    eventEmitter.emit('getNewCodes');
  })
  .catch((err) => { throw err; })
});

eventEmitter.on('getNewCodes', () => {
  getData.getContent(url).then((content) => {
    var arr = JSON.parse(content);
    for (var k in arr) {
      downloadedCode.push({'code' : k, 'name' : arr[k]});
      deleteCodeSet.push(k);
      deleteCodeV.push(k + 'v');
      var dataUrl = 'http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?symbol=' +
                    k + '&end_date=' + endDate + '&begin_date=' + startDate;
      stockUrl.push(dataUrl);
    }
    logger.info('Downloaded latest stock codes.');
    eventEmitter.emit('deleteCodes');
  })
  .catch((err) => { throw err; })
});

eventEmitter.on('deleteCodes', () => {
  mongoClient.connectAsync(dbUrl).then((db) => {
    return db.collection(nameDb).drop();
  })
  .then(() => {
    logger.info('Deleted documents in collection', nameDb, 'before updating.');
    eventEmitter.emit('updateCodes');
  })
  .catch((err) => { throw err; })
});

eventEmitter.on('updateCodes', () => {
  mongoClient.connectAsync(dbUrl).then((db) => {
    return db.collection(nameDb).insertAsync(downloadedCode);
  })
  .then(() => {
    logger.info('Updated collection:', nameDb);
    eventEmitter.emit('updateStocks');
  })
  .catch((err) => { throw err; })
});

eventEmitter.on('deleteStocks', () => {
  if (deleteCodeSet.length > 0) {
    var code = deleteCodeSet.shift();
    deleteObj(code, startDate, 'deleteStocks');
  }
  else {
    eventEmitter.emit('updateStocks');
  }
});

eventEmitter.on('updateStocks', () => {
  if (stockUrl.length > 0) {
    var url = stockUrl.shift();
    if (url.substring(68, 76) > 'sz000581') {
      getData.getContent(url).then((data) => {
        parser.parseString(data, function (err, result) {
          var prices = result.control.content;
          var priceArray = [];
          for (var v in prices) {
            priceArray.push(prices[v].$);
          }
          logger.info('Fetch data via HTTP:', url.substring(68, 76));
          insertObjOrArray(url.substring(68, 76), priceArray, 'updateStocks');
        })
        .catch((err) => { throw err; })
      });
    }
    else {
      eventEmitter.emit('updateStocks');
    }
  }
  else {
    eventEmitter.emit('setNextStartDate');
  }
});

eventEmitter.on('setNextStartDate', () => {
  mongoClient.connectAsync(dbUrl).then((db) => {
    return db.collection(dateDb).findAndModifyAsync(
      { d: startDate }, // query
      { d: 1 },         // sort
      { d: nextStartDate }, // remove or update
      { 'update': true }
    );
  })
  .then(() => {
    logger.info('next downloand and update date:', nextStartDate);
    eventEmitter.emit('getAnalysisStartDate');
  })
  .catch((err) => { throw err; })
});

eventEmitter.on('getAnalysisStartDate', () => {
  mongoClient.connectAsync(dbUrl)
  .then((db) => {
    return db.collection(analysisDateDb).findAsync();
  })
  .then((cursor) => {
    return cursor.toArrayAsync();
  })
  .then((arr) => {
    analysisStartDate = arr[0].d;
  })
  .then(() => {
    logger.info('Updating Analysis Data starts from:', analysisStartDate);
    eventEmitter.emit('deleteAnalysisDate');
  })
  .catch((err) => { throw err; })
});

eventEmitter.on('deleteAnalysisDate', () => {
  if (deleteCodeV.length > 0) {
    var codeV = deleteCodeV.shift();
    deleteObj(codeV, startDate, 'deleteAnalysisDate');
  }
  else {
    eventEmitter.emit('analyzeStocks');
  }
});

eventEmitter.on('analyzeStocks', () => {
  if (downloadedCode.length > 0) {
    var code = downloadedCode.shift().code;
    mongoClient.connectAsync(dbUrl)
    .then((db) => {
      return db.collection(code).find({d:{$gte:analysisStartDate}}).sort({d:1}).toArrayAsync();
    })
    .then((arr) => {
      if (arr.length > 0) {
        var a = [];
        var preClose = arr[0].c;
        var preVolumn = arr[0].v;
        for (var i = 1, l = arr.length; i < l; i ++ ) {
          a.push({ 'd' : arr[i].d, 
            'o' : arr[i].o, 
            'h' : arr[i].h, 
            'c' : arr[i].c, 
            'l' : arr[i].l, 
            'v' : arr[i].v, 
            'bl': arr[i].bl, 
            // price changed
            'pc' : priceCalculation.valueChanged(arr[i].c, preClose),
            // volunm changed
            'vc' : priceCalculation.valueChanged(arr[i].v, preVolumn),
            // color
            'cl' : priceCalculation.color(arr[i].o, arr[i].c),
            // go up or down
            'up' : priceCalculation.goingUp(arr[i].c, preClose),
            'shoulder' : priceCalculation.shoulder(arr[i].o, arr[i].c, preClose),
            'buttocks' : priceCalculation.buttocks(arr[i].o, arr[i].c, preClose),
            'head' : priceCalculation.head(arr[i].h, preClose),
            'feet' : priceCalculation.feet(arr[i].l, preClose),
            'body' : priceCalculation.body(arr[i].o, arr[i].c, preClose),
            'whole' : priceCalculation.whole(arr[i].h, arr[i].l, preClose)
          });
          preClose = arr[i].c;
          preVolumn = arr[i].v;
        }
        insertObjOrArray(code + 'v', a, 'analyzeStocks');
      }
      else {
        eventEmitter.emit('analyzeStocks');
      }
    })
  }
  else {
    eventEmitter.emit('setNextAnalysisStartDate');
  }
});

eventEmitter.on('setNextAnalysisStartDate', () => {  
  mongoClient.connectAsync(dbUrl).then((db) => {
    return db.collection(analysisDateDb).findAndModifyAsync(
      { d: analysisStartDate }, // query
      { d: 1 },                 // sort
      { d: nextAnalysisStartDate },
      { 'update': true }
    );
  })
  .then(() => {
    logger.info('next analysis date:', nextAnalysisStartDate);
    logger.info('OVER PROCESSING !!!');
    process.exit();
  })
  .catch((err) => { throw err; })
});

eventEmitter.emit('getStartDate');

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

var deleteObj = (dbName, startDate, e) => {
  mongoClient.connectAsync(dbUrl)
  .then((db) => {
    return db.collection(dbName).removeAsync({d : {$gte : startDate}});
  })
  .then(() => {
      logger.info('Removed relevant data in', dbName);
      eventEmitter.emit(e);
  })
  .catch(function(err) {
    throw err;
  });
}