var http = require('http');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;

var db;
var dbUrl = 'mongodb://localhost:27017/test';

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
    db.collection('stocknames').find().toArray(function(err, res) {
        if (err) { throw err };
        if (res.length !== 0) {
            db.collection('stocknames').drop(function(err, response) {
                if (err) { throw err };
            });
        }
        done(null, db);
   });
},
function(db, done)
{
    http.get(url, function(res)
    {
        var chunk = '';
        res.on('data',function(d)
        {
            chunk += d;
        });
        res.on('end',function()
        {
            var codes = JSON.parse(chunk);
            done(null, codes);
        });
    });    
},
function(codes)
{
    var a = [];
    for (var k in codes)
    {
        a.push({'code' : k, 'name' : codes[k]});
    }
    upsertDb(a);
}],
function(err, result)
{
    if (err) { return console.error(err); }
    else { console.log(result); }
    db.close();
});

var upsertDb = (codes) => {
    if (codes.length > 0) {
        var c = codes.shift();
        db.collection('stocknames').insert({ 'code' : c.code, 'name' : c.name }, function(err, result) {
            if (err) { throw err };
            console.log('Inserted ', c, 'into stocknames collection.');
            if (codes.length > 0){
                upsertDb(codes);           
            }
        });
    }
};