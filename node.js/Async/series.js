var https = require('https')
  , async = require('async');

async.series( { requestOne: function(done)
{
    fetchURL('https://www.google.com', done);
},
requestTwo: function(done)
{
    fetchURL('https://www.icloud.com', done);
}
},
function(err, result)
{
    if (err) 
    {
        return console.error(err);
    }
    console.log(result);
});

function fetchURL(url, done) 
{
    var body = '';
    https.get(url, function(res)
    {
        res.on('data', function(chunk)
        {
            body += chunk.toString();
        });
        res.on('end', function(chunk)
        {
            done(null, body);
        });
    })
    .on('error', function(e)
    {
        done(e);
    });
}

/*
series(tasks, [callback])

Run the functions in the tasks array in series, each one running once the previous function has completed. 
If any functions in the series pass an error to its callback, no more functions are run, 
and callback is immediately called with the value of the error. 
Otherwise, callback receives an array of results when tasks have completed.

It is also possible to use an object instead of an array. 
Each property will be run as a function, and the results will be passed to the final callback as an object instead of an array. 
This can be a more readable way of handling results from series.

Note that while many implementations preserve the order of object properties, 
the ECMAScript Language Specifcation explicitly states that

The mechanics and order of enumerating the properties is not specified.
So if you rely on the order in which your series of functions are executed, 
and want this to work on all platforms, consider using an array.
*/