var xml2js = require('xml2js');
var http = require('http');
var parser = new xml2js.Parser();
var async = require('async');
var theDate = require('../yyyymmdd.js');
var MongoClient = require('mongodb').MongoClient;

var db;
var dbUrl = 'mongodb://localhost:27017/test';

var today = theDate.nDaysAgo(0);
var beginDate = '20160423';

var url = 'http://ctxalgo.com/api/stocks';
    
async.waterfall([ function(done)
{
    MongoClient.connect(dbUrl, function(err, database)
    {
        if (err) { throw err };
        db = database;
        done(null, db);
    });
},
function(db, done)
{
    var codes = [];
    db.collection('stocknames').find().toArray(function(err, items)
    {
        items.forEach(function(value, index, items){
            codes.push(value.code);    
        });
        done(null, codes);
    });
},
function(codes, done)
{
    var urls = [];
    for (var i in codes)
    {
        var u = 'http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?symbol=' +
                 codes[i] + '&end_date=' + today + '&begin_date=' + beginDate;
        urls.push(u);
    }
    done(null, urls);  
},
function(urls, done)
{
    stockDate(urls);
}],
function(err, result)
{
    if (err) { return console.error(err); }
    else { console.log(result); }
});

var stockDate = function (urls)
{
    if (urls.length > 0)
    {
        var url = urls.shift();
        http.get(url, function(res)
        {        
            var chunk = '';
            res.on('data',function(d)
            {
                chunk += d;
            });
            res.on('end',function()
            {
                parser.parseString(chunk, function (err, result)
                {
                    // data structure:
                    // {"control":{"content":
                    // [{"$":{"d":"2015-04-08","o":"41.100","h":"41.300","c":"39.880","l":"38.000","v":"390640","bl":""}},
                    // {"$":{"d":"2015-04-09","o":"39.550","h":"40.480","c":"39.960","l":"36.010","v":"396581","bl":""}}]}}
                    var prices = result.control.content;
                    var priceArray = [];
                    var stockCode = url.substring(68, 76);
                    for (var v in prices)
                    {
                        priceArray.push(prices[v].$);
                    }
                    if (urls.length > 0)
                    {
                        stockDate(urls);           
                    }
                    if (priceArray.length > 0)
                    {
                        db.collection(stockCode).insert(priceArray, function(err, result) 
                        {
                            if (err) { throw err };
                            var l = priceArray.length;
                            console.log('Inserted ' + l + ' documents into ' + stockCode + ' collection.');
                        });
                    }
                    else
                    {
                        console.log(stockCode, 'has no value to be inserted.')
                    }
                });
            });
            res.on('timeout', function()
            {
                console.log('timeout:', url.substring(68, 76), 'retrying...');
                stockDate(urls.unshift(url));
            });
            res.on('error', function(err)
            {
                if (err.message.code === 'ETIMEDOUT')
                {
                    console.log('timeout:', url.substring(68, 76), 'retrying...');
                }
                else
                {
                    console.log('Got error: ${err.message}');
                }
                stockDate(urls.unshift(url));
            });
        });    
    }    
};