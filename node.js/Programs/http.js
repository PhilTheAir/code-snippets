var http = require('http');
var fs = require('fs');

// type: node http.js 8877 e:\xml.js
port = Number(process.argv[2]);
var filepath = process.argv[3];
var server = http.createServer(function (req, res)
{
    // show content of the file in the server page
    res.writeHead(200, { 'content-type': 'text/plain' });
    fs.createReadStream(filepath).pipe(res);
});
server.listen(port);
