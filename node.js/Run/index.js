var express = require('express');
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;

var async = require('async');
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('html', ejs.renderFile);

var db;
var dbUrl = 'mongodb://localhost:27017/test';
MongoClient.connect(dbUrl, function(err, database)
{
    if (err) { throw err };
    db = database;
});

app.get('/index', function(request, response, next) 
{
    db.collection('stocknames').find().toArray(function(err, items)
    {
        var json = [];
        items.forEach(function(value, index, items){
            json.push({ 'code' : value.code, 'name' : value.name });    
        });
        var sh = [];
        var sz = [];
        var cy = [];
        json.forEach(function(value, index, json){
            if (value.code[2] === '6')
            {
                sh.push(value);
            }
            else if (value.code[2] === '0')
            {
                sz.push(value);
            }
            else
            {
                cy.push(value);
            }
        });
        response.render('index', {indexActive : 'active', sh : sh, sz : sz, cy : cy });
    });
});

app.get('/set', function(request, response, next) 
{
    response.render('set', {setActive : 'active'});
});

app.get('/show', function(request, response, next) 
{
    response.render('stock', {code : 'sh000001'});
});

app.get('/test', function(request, response, next) 
{
    response.render('test', {pastActive : 'active'});
});

app.get('/stock/:code', function(request, response, next) 
{
    var code = request.params.code;
    response.render('stock', {code : code, stockActive : 'active'});
});

app.get('/stock', function(request, response, next) 
{
    response.render('stock', {code : 'sh000001', stockActive : 'active'});
});

app.get('/my', function(request, response, next) 
{
    var codes = [];
        db.collection('stocknames').find().toArray(function(err, items)
        {
            items.forEach(function(value, index, items){
                codes.push(value.code);    
            });
      
            for (var i in codes)
            {
                db.collection(codes[i] + 'v').find({d : { $gt: '2016-04-24' }}).sort({d:1}).toArray(function(err, items)
                {
                    if (items.length > 0 ){
                        var num = 0;
                        items.forEach(function(value, index, items){
                            if (value.pc <= 0) {
                                num += 1;
                            }
                        });
                        if (num >= 8) {
                            db.collection('mystocks').findAndModify({
                                    query: { d: '2016-05-09', c: codes[i] },
                                    update: { s: 'more than 8 greens out of 10 days' },
                                    upsert: true}, function(err, result) 
                                    {
                                        if (err) { throw err };
                                        console.log('Inserted ' + codes[i] + ' documents into "mystocks" collection.');
                                    });

                       }
                    };
                });
            }
        db.collection('mystocks').find({d: '2016-05-09'}).toArray((err, items) => {
            response.render('my', {mystocks: items});
        });
      });
    });

app.get('*', function(request, response, next) 
{
    response.render('404.html');
});

app.set('port', 3000);

// Boot the server
var server = app.listen(app.get('port'), function() 
{
    console.log('Express server listening on port', server.address().port);
});