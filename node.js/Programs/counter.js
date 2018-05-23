var express = require('express');

var e = express();

e.get('/', function (request, response)
{
    response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });

    setInterval(function ()
    {
        response.write(counter());
    }, 1000);
});

e.listen(3000, function () { console.log('express is listening at port 3000'); });

function counter()
{
    var date = new Date(),
        year = date.getFullYear(),
        date2 = new Date(year, 12, 31, 23, 59, 59),
        time = (date2 - date) / 1000,
        day = Math.floor(time / (24 * 60 * 60)),
        hour = Math.floor(time % (24 * 60 * 60) / (60 * 60)),
        minute = Math.floor(time % (24 * 60 * 60) % (60 * 60) / 60),
        second = Math.floor(time % (24 * 60 * 60) % (60 * 60) % 60),
        s = year + " year : left: " + day + " Days " + hour + " Hours " + minute + " Minutes " + second + " Seconds";

    return s;
}