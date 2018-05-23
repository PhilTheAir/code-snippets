var fs = require('fs');
var path = require('path');
var http = require('http');
var bl = require('bl');
var controller = require('./controller.js');

// type: node argv.js e:\xml.js e:\ txt http://www.google.com/ http://www.google.com.au/ http://www.google.cn/
console.log(process.argv);

var file = process.argv[2];
var directory = process.argv[3];
var extension = process.argv[4];
var webget1 = process.argv[5];
var webget2 = process.argv[6];
var webget3 = process.argv[7];

// sync: output the number of lines of the file
var syncContents = fs.readFileSync(file);
var syncLines = syncContents.toString().split('\n').length - 1
console.log("1 sync: " + syncLines);

// async: output the number of lines of the file
fs.readFile(file, function (err, asyncContents) {
    // fs.readFile(file, 'utf8', callback) can also be used
    var asyncLines = asyncContents.toString().split('\n').length - 1
    console.log("2 async: " + asyncLines);
});

// async: output the file names filtered with ".txt" in given directory
fs.readdir(directory, function (err, list) {
    list.forEach(function (file) {
        if (path.extname(file) === '.' + extension) {
            console.log("3 async: " + file);
        }
    })
});

// use module && async: output the file names filtered with ".txt" in given directory
controller.filterFunction(directory, extension, function (err, list) {
    if (err) {
        return console.error('There was an error:', err);
    }

    list.forEach(function (file) {
        console.log("4 module && async: " + file)
    })
});

// http get:
http.get(webget1, function (response) {
    response.setEncoding('utf8')
    response.on('data', console.log)
    response.on('error', console.error)
});

// http get && use bl
http.get(webget1, function (response) {
    response.pipe(bl(function (err, data) {
        if (err) {
            return console.error(err);
        }
        data = data.toString();
        console.log("http get && use bl: " + data.length);
        console.log("http get && use bl: " + data);
    }));
});

// http get 3 urls and print them in order
for (var i = 5; i <= 7; i++) {
    controller.httpGet(i);
}
    