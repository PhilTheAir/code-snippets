var http = require('http');
var async = require('async');

///// reduce(arr, memo, iterator(memo, item, callback), [callback])
async.reduce(['one', 'two', 'three'], 0, function(memo, item, callback)
{
    var body = '';

    http.get('http://www.baidu.com' + "?number=" + item, function(res)
    {
        res.on('data', function(chunk)
        {
            body += chunk.toString();
        });
        res.on('end', function()
        {
            callback(null, memo + Number(body));
        }); 
    })
    .on('error', callback);
}, 
function(err, result)
{
    if (err) 
    {
        return console.log(err);
    }
    console.log(result);
});

/*
reduce(arr, memo, iterator, [callback])

Aliases: inject, foldl

Reduces arr into a single value using an async iterator to return each successive step. 
memo is the initial state of the reduction. This function only operates in series.

For performance reasons, it may make sense to split a call to this function into a parallel map, 
and then use the normal Array.prototype.reduce on the results. 
This function is for situations where each step in the reduction needs to be async; 
if you can get the data before reducing it, then it's probably a good idea to do so.
*/