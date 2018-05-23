var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var fs = require('fs');

var rowsUser = []; 
var rowsFileAccess = []; 
var rowsDept = []; 
var rowsLog = [];
var rowsModule = [];  
var rowsRole = [];

var queryUser = "select * from [SBRS].[Report].[USER2_T]";
var queryFileAccess = "select * from [SBRS].[Fova].[FILEQuery_T]";
var queryDept = "select * from [SBRS].[Report].[DEPT_T]";
var queryLog = "select top 100 * from [SBRS].[Report].[LOG_T]";
var queryModule = "select * from [SBRS].[Report].[MODUDLE_T]";
var queryRole = "select * from [SBRS].[Report].[ROLE2_T]";

var poolConfig = 
{
    min: 0,
    max: 9,
    log: true,
    idleTimeout: 60000,
    retryDelay: 2000,
    acquireTimeout: 2000
};

var connectionConfig = 
{
    userName: 'sa',
    password: 'PassworD123',
    server: '123.56.14.5',
    options: { connectTimeout: 25000 }
};

var pool = new ConnectionPool(poolConfig, connectionConfig);

// User
pool.acquire(function (err, connection)
{
    exec(err, connection, queryUser, rowsUser, 'User');
});

// FileAccess
pool.acquire(function (err, connection)
{
    exec(err, connection, queryFileAccess, rowsFileAccess, 'FileAccess');
});

// Dept
pool.acquire(function (err, connection)
{
    exec(err, connection, queryDept, rowsDept, 'Dept');
});

// Log
pool.acquire(function (err, connection)
{
    exec(err, connection, queryLog, rowsLog, 'Log');
});

// Module
pool.acquire(function (err, connection)
{
    exec(err, connection, queryModule, rowsModule, 'Module');
});

// Role
pool.acquire(function (err, connection)
{
    exec(err, connection, queryRole, rowsRole, 'Role');
});

var exec = function (err, connection, query, rows, tableName)
{
    if (err) { console.error(err) };

    var request = new Request(query, function(err, rowCount)
    {
        if (err) { console.error(err) };
        connection.release();
    });

    request.on('row', function(columns)
    {
        var row = '';
	    columns.forEach(function(column) { if (column.value !== null) { row += column.value + '|'; } });
	    rows.push(row);
    });

	request.on('doneInProc', function(rowCount, more)
	{
	    console.log('Table of ' + tableName + ': ' + rowCount + ' rows returned');
	    var file = fs.createWriteStream(tableName + '.txt');
		file.on('error', function(){});
		rows.forEach(function(d) { file.write(d.slice(0, -1) + '\r\n'); });
		file.end();
	});

    connection.execSql(request);
};

pool.on('error', function(err) 
{
    console.error(err);
});
