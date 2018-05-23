var http = require('http');
var async = require('async');

// input :
// E:\>node each.js http://www.baidu.com http://dict.baidu.com

async.each( process.argv.slice(2), 
function(item, done)
{
    var body = '';
    http.get(item, function(res)
    {
        res.on('data', function(chunk)
        {
            body += chunk.toString();
        });
        res.on('end', function()
        {
            console.log(body);
        });
    })
    .on('error', function(err)
    {
        done(err);
    });
},
function(err)
{
    if(err) 
    {
        console.error(err);
    }
});

/*
each(arr, iterator, [callback])

Applies the function iterator to each item in arr, in parallel. 
The iterator is called with an item from the list, and a callback for when it has finished. 
If the iterator passes an error to its callback, the main callback (for the each function) is immediately called with the error.

Note, that since this function applies iterator to each item in parallel, there is no guarantee that the iterator functions will complete in order.
*/