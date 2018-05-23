var http = require('http');

var url = 'http://ctxalgo.com/api/stocks';
    
var getJson = function()
{
    http.get(url, function(res)
    {
        var chunk = '';
        var codeArray = [];
        res.on('data',function(d)
        {
            chunk += d;
        });
        res.on('end',function()
        {
            var codes = JSON.parse(chunk);
            for (var code in codes)
            {
                codeArray.push(code);
            }
            return codeArray;
        });
    });
};

exports.getJson = getJson;