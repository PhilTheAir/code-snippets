var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var fs = require('fs');

var config = 
{
    userName: 'sa',
    password: 'PassworD123',
    server: '123.56.14.5',
    options: { connectTimeout: 25000 }
};

var connection = new Connection(config);
var rowsUser = []; 
var queryUser = "select * from [SBRS].[Report].[Log_T]";
var requestUser = new Request(queryUser, function (err) 
{
    if (err) { return console.error(err); }
    connection.close();
});

requestUser.on('row', function (columns) 
{
    // columns.forEach(function(column) 
    // {
        // console.log(column.metadata.colName + ' : ' + column.value);
        // SepID : 188
        // UserSysID : 03013
        // UserID : YukeL
        // UserName : Yuke Liu
        // UserPasswd : 4a7d1ed414474e4033ac29ccb8653d9b
        // UserRoleID : 02
        // UserDeptID : 03
        // UserStatus : 1
        // CreateDate : Sat Sep 05 2015 02:01:22 GMT+1000 (AUS Eastern Standard Time)
    // });
    var row = '';
    columns.forEach(function(column) 
    {
        if (column.value !== null) { row += column.value + '|'; }
    });
    rowsUser.push(row);
});

requestUser.on('doneInProc', function(rowCount, more) 
{
    console.log('Table of User: ' + rowCount + ' rows returned');
    var file = fs.createWriteStream('log_db.txt');
	file.on('error', function(){});
	rowsUser.forEach(function(d)
	{
		file.write(d.slice(0, -1) + '\r\n');
	});
	file.end();
});

connection.on('connect', function (err) 
{
    if (err) { return console.error(err); }
    connection.execSql(requestUser);
});
