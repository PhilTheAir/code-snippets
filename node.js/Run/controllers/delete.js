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
        db.collection(codes[i] + 'v').remove({ d: { $gt: '2016-01-01'}}, function(err, results) 
        {
            console.log(i)
        });
    }
    console.log('done')
}],
function(err, result)
{
    if (err) { return console.error(err); }
    else { console.log(result); }
});

