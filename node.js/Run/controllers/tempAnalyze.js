var http = require('http');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var theDate = require('../yyyymmdd.js');

var db;
var dbUrl = 'mongodb://localhost:27017/test';
var today = theDate.hyphen(0);

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
    db.collection('stocknames').find().toArray(function(err, items)
    {
        done(null, Object.keys(items[0]));
    });
},
function(codeArray, done)
{
    insertData(codeArray);
}],
function(err, result)
{
    if (err) { return console.error(err); }
    else { console.log(result); }
});

var insertData = function(codes)
{
    if (codes.length > 0)
    {
        var code = codes.shift();
        db.collection(code).find().toArray(function(err, items)
        {
            if (err) { return console.error(err); }
            var a = [];
            var preClose = 100;
            var preVolumn = 100000000;
            items.forEach(function(value, index, items)
            {
                a.push({ 'd' : value.d, 'o' : value.o, 'h' : value.h, 'c' : value.c, 
                        'l' : value.l, 'v' : value.v, 'bl': value.bl, 
                        // price changed
                        'pc' : valueChanged(value.c, preClose),
                        // volunm changed
                        'vc' : valueChanged(value.v, preVolumn),
                        // color
                        'cl' : color(value.o, value.c),
                        // go up or down
                        'up' : goingUp(value.c, preClose),
                        'shoulder' : shoulder(value.o, value.c, preClose),
                        'buttocks' : buttocks(value.o, value.c, preClose),
                        'head' : head(value.h, preClose),
                        'feet' : feet(value.l, preClose),
                        'body' : body(value.o, value.c, preClose),
                        'whole' : whole(value.h, value.l, preClose)
                    });
                preClose = value.c;
                preVolumn = value.v;
            });
            if (a.length > 0)
            {
                db.collection(code + 'v').insert(a, function(err, result)
                {
                    if (err) { throw err };
                    var l = a.length;
                    console.log('Inserted ' + l + ' documents into ' + code + 'v' + ' collection.');
                });
            }
            else
            {
                console.log(code + 'v', 'has no value to be inserted.')
            }
            if (codes.length > 0)
            {
                insertData(codes);
            }
        });
    }    
};

var valueChanged = function(close, preClose)
{
    if (preClose === 0)
    {
        return '0';
    }  
    else
    {
        return ((close - preClose) /  preClose).toString();
    }
};

var color = function(open, close)
{
    if (open === close)
    {
        return 'white';
    }
    else if (open > close)
    {
        return 'green';
    }
    else
    {
        return 'red';
    }
};

var goingUp = function(close, preClose)
{
    if (close === preClose)
    {
        return 'even';
    }  
    else if (close > preClose)
    {
        return 'up';
    }
    else
    {
        return 'down';
    }
};

var shoulder = (open, close, preclose) => {
    return (Math.max(open, close) - preclose) / preclose;
};

var buttocks = (open, close, preclose) => {
    return (Math.min(open, close) - preclose) / preclose;
};

var head = (high, preclose) => {
    return (high - preclose) / preclose;
};

var feet = (low, preclose) => {
    return (low - preclose) / preclose;
};

var body = (open, close, preclose) => {
    return Math.abs(open - close) / preclose;
};

var whole = (high, low, preclose) => {
    return (high - low) / preclose;  
};