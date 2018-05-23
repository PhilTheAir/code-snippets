var express = require('express');
var app = express();

app.get('/', function (req, res) {
    // extracts data from query string in the GET '/' URL route
    // http://localhost:3000/?x=index
    var query = req.query;
    // outputs it back to the user in JSON format
    res.send(query);
    // {"x":"index"}
});

app.listen(3000);