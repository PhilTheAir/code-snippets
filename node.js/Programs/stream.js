var through = require('through2');
var split = require('split');

var lineCount = 0;

var tr = through(function (buf, enc, callback){
    var line = buf.toString();
    this.push(lineCount % 2 === 0
        ? line.toLowerCase() + '\n'
        : line.toUpperCase() + '\n');
    lineCount++;
    callback();
});

process.stdin
    .pipe(split())
    .pipe(tr)
    .pipe(process.stdout);