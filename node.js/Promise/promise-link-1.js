var Q = require('q');
var defer = Q.defer();

var users = [{ 'name': 'andrew',
               'passwd': 'password' }];

function getUsername()
{
    return defer.promise;
}

function getUser(username)
{
    var _user;
    users.forEach(function (element)
    {
        if (element.name === username)
        {
            _user = element;
        }
    });
    return _user;
}

getUsername().then(function (username)
{
    return getUser(username);
}).then(function (user)
{
    console.log(user);
});

defer.resolve('andrew');