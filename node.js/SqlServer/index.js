var Connection = require('tedious').Connection;

var config = 
{
    userName: 'sa',
    password: 'PassworD5',
    server: '123.56.14.155',
    options: {encrypt: true, database: 'SBRS'}
};

var connection = new Connection(config);

connection.on('connect', function(err) 
{
    console.log("Connected");
});