var http = require('http');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var theDate = require('../yyyymmdd.js');

var db;
var dbUrl = 'mongodb://localhost:27017/test';
var today = '2016-04-05';

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
    codes.forEach((code, index, codes) => {
                db.collection(code).find({d:{$gt:today}}).sort({d:1}).batchSize(1000).toArray(function(err, todayValue)
                {
                    if (todayValue.length > 0) {
                        var a = [];
                        if (err) { return console.error(err); }
                        var preClose = todayValue[0].c;
                        var preVolumn = todayValue[0].v;
                        for (var i = 1, l = todayValue.length; i < l; i ++ ) {
                            a.push({ 'd' : todayValue[i].d, 
                                'o' : todayValue[i].o, 
                                'h' : todayValue[i].h, 
                                'c' : todayValue[i].c, 
                                'l' : todayValue[i].l, 
                                'v' : todayValue[i].v, 
                                'bl': todayValue[i].bl, 
                                // price changed
                                'pc' : valueChanged(todayValue[i].c, preClose),
                                // volunm changed
                                'vc' : valueChanged(todayValue[i].v, preVolumn),
                                // color
                                'cl' : color(todayValue[i].o, todayValue[i].c),
                                // go up or down
                                'up' : goingUp(todayValue[i].c, preClose),
                                'shoulder' : shoulder(todayValue[i].o, todayValue[i].c, preClose),
                                'buttocks' : buttocks(todayValue[i].o, todayValue[i].c, preClose),
                                'head' : head(todayValue[i].h, preClose),
                                'feet' : feet(todayValue[i].l, preClose),
                                'body' : body(todayValue[i].o, todayValue[i].c, preClose),
                                'whole' : whole(todayValue[i].h, todayValue[i].l, preClose)
                            });
                            preClose = todayValue[i].c;
                            preVolumn = todayValue[i].v;
                        }
                        if (a.length > 0 ) {
                            db.collection(code + 'v').insert(a, function(err, result) {
                                if (err) { console.log('xxxxxxxxxxxx', code); };
                                var l = a.length;
                                console.log('Inserted ' + l + ' documents into ' + code + 'v' + ' collection.');
                            });
                        }
                    }
                });
            });
  
        /*for (var code in o) {
            if (obj.hasOwnProperty(code)) {
                db.collection(code + 'v').insert(obj.code, function(err, result) {
                            if (err) { console.log('xxxxxxxxxxxx', code); };
                            var l = obj.code.length;
                            console.log('Inserted ' + l + ' documents into ' + code + 'v' + ' collection.');
                        });
            }
        }*/
     
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