var http = require('http');
var async = require('async');

var requestBody = '';
var count = 0;

///// whilst(test, fn(callback), callback)
async.whilst(function() 
{
    return !/Date/.test(requestBody.trim());
},
function(done)
{
    var body = '';
    http.get('http://www.baidu.com', function(res)
    {
        res.on('data', function(chunk)
        {
            body += chunk.toString();
        });
        res.on('end', function()
        {
            ++count;
            requestBody = body;
            // console.log(requestBody);
            done();
        });
    })
    .on('error', done);
},
function(err)
{
    if (err) 
    {
        return console.log(err);
    }
    console.log(count);
});

/*
whilst(test, fn, callback)

Repeatedly call fn, while test returns true. Calls callback when stopped, or an error occurs.

Arguments

test() - synchronous truth test to perform before each execution of fn.

fn(callback) - A function which is called each time test passes. 
The function is passed a callback(err), which must be called once it has completed with an optional err argument.

callback(err) - A callback which is called after the test fails and repeated execution of fn has stopped.
*/