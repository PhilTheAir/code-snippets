var fs = require('fs');
var request = require('request');
var async = require('async');

var windowsEndOfLine = '\r\n';

async.waterfall([ function(done)
{
    fs.readFile('./cities.txt', "utf-8", function(err, data)
    {
        if (err) 
        {
            return done(err);
        }
        done(null, data.split(windowsEndOfLine));
    });
},
function(data, done)
{
    for (var d in data)
    {
        ////////// http://api.openweathermap.org/data/2.5/weather?q=London
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + data[d];
        request({ url: url, json: true }, function(err, response, body) 
        {
            if (err) 
            {
            console.log('error: ' + err);
            } 
            else 
            {
                // {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],
                // "base":"stations","main":{"temp":293.67,"pressure":1017,"humidity":56,"temp_min":291.15,"temp_max":295.93},
                // "visibility":10000,"wind":{"speed":5.1,"deg":190},"clouds":{"all":40},"dt":1439984042,
                // "sys":{"type":1,"id":5093,"message":0.0277,"country":"GB","sunrise":1439959947,"sunset":1440011678},
                // "id":2643743,"name":"London","cod":200}
                console.log(body.name + ' : ' + body.weather[0].main + ' : ' + body.weather[0].description + ' ; ' + 
                'max temperature : ' + Kelvin2Celsius(body.main.temp_max) + 
                ' , min temperature : ' + Kelvin2Celsius(body.main.temp_min) + ' .');
            }
        });
    }
}],
function(err, result)
{
    if (err) 
    {
        return console.error(err);
    }
    else
    {
        console.log(result);
    }
});

function Kelvin2Celsius(f)
{
    return (f - 273.15).toFixed(1);
}

/*
waterfall(tasks, [callback])

Runs the tasks array of functions in series, each passing their results to the next in the array. 
However, if any of the tasks pass an error to their own callback, the next function is not executed, 
and the main callback is immediately called with the error.

Arguments

tasks - An array of functions to run, each function is passed a callback(err, result1, result2, ...) it must call on completion. 
The first argument is an error (which can be null) and any further arguments will be passed as arguments in order to the next task.

callback(err, [results]) - An optional callback to run once all the functions have completed. 
This will be passed the results of the last task's callback.
*/