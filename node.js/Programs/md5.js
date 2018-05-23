var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function (requst, response) 
{  
    var q = requst.query.q;             // http://localhost:3000/?q=liwenchen
    if (q != undefined)
    {
        var md5Value = utility.md5(q);  // 6eb32aba5e72b37aad0a7a54a349b5bf
        response.send(md5Value);        
    }
    else
    {
        response.send('Hello World, from the express.');
    }
});

app.listen(3000, function (requst, response)
{
    console.log('app is running at port 3000');
});