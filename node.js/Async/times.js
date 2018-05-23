var http = require('http');
var qs = require('querystring');
var async = require('async');
var hostname = 'http://www.baidu.com';
var port = '8088';
var url = 'http://' +  hostname + ':' + port;

async.series({ post: function(done)
{
    async.times(5, function(n, next)
    {
        _addUser(++n, function(err)
        {
            next(err);
        });
    }, 
    function(err)
    {
        if (err) 
        {
            return done(err);
        }
        done(null, 'saved');
    });
},
get: function(done)
{
    http.get(url + '/users', function(res)
    {
        var body = "";
        res.on('data', function(chunk)
        {
            body += chunk.toString();
        });
        res.on('end', function()
        {
            done(null, body);
        });
    }).on('error', done);}
}, 
function(err, result)
{
    if (err) 
    {
        return console.log(err);
    }
    console.log(result.get);
});

function _addUser(user_id, callback)
{
    var postdata = JSON.stringify({'user_id': user_id}),
    opts = {  hostname: hostname,
                    port: port,
                    path: '/users/create',
                    method: 'POST',
                    headers: { 'Content-Length': postdata.length }
                };
    var req = http.request(opts, function(res)
    {
        res.on('data', function(chunk){});
        res.on('end', function()
        {
            callback();
        });
    });
    req.on('error', callback);
    req.write(postdata);
    req.end();
}

/*
times(n, iterator, [callback])

Calls the iterator function n times, and accumulates results in the same manner you would use with map.

Arguments

n - The number of times to run the function.

iterator - The function to call n times.

callback - see map
*/