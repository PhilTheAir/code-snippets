var Q = require('q');
var defer = Q.defer();
var fs = require('fs');

function getInputPromise()
{
    return defer.promise;
}

var outputPromise = getInputPromise().then(function (fulfilled)
{
    var _defer = Q.defer();
    // 如果指定了 encoding，data 是一个解析后的字符串，否则 data 将会是以 Buffer 形式表示的二进制数据
    fs.readFile('heroku.txt', 'utf8', function (err, data)
    {
        if (!err && data)
        {
            _defer.resolve(data);
        }
    });
    return _defer.promise;
}).fail(function (rejected)
{
    throw new Error('rejected');
}).progress(function (progress)
{
    console.log(progress);
});

outputPromise.then(function (fulfilled)
{
    console.log(fulfilled);
}, function (rejected)
{
    console.log(rejected);
});

defer.notify(1);
defer.resolve();
defer.notify(2);