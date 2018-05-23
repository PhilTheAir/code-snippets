var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res)
{
    var filename = process.argv[2];
    var books;
    fs.readFile(filename, function (err, data)
    {
        if (err)
        {
            return res.sendStatus(500);
        }
        try
        {
            books = JSON.parse(data);
        }
        catch (e)
        {
            res.sendStatus(500);
        }
        res.json(books);
    });
});

app.listen(2222);
