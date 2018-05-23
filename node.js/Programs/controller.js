var fs = require('fs');
var path = require('path');
var http = require('http');
var bl = require('bl');
var results = new Array();

module.exports.filterFunction = function (dir, filterString, callback)
{
    fs.readdir(dir, function (err, list)
    {
        if (err)
        {
            return callback(err);
        }

        list = list.filter(function (file)
        {
            return path.extname(file) === '.' + filterString;
        });

        callback(null, list);
    });
};

module.exports.httpGet = function (index)
{
    http.get(process.argv[index], function (response)
    {
        response.pipe(bl(function (err, data)
        {
            if (err)
            {
                return console.error(err);
            }

            results[index - 5] = data.toString();
            if (results.length == 3)
            {
                for (var i = 0; i < 3; i++)
                {
                    console.log(results[i]);
                }
            }
        }));
    });
};