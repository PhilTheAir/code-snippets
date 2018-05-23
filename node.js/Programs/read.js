var readLine = require('lei-stream').readLine;
var writeLine = require('lei-stream').writeLine;

var inputFile = 'large.txt';
var outputFile = 'output_large.txt';

var output = writeLine(outputFile, { cacheLines: 1 });
var counter = 0;
var startTime = Date.now();

readLine(inputFile).go(function (data, next) {
    console.time("concatenation");
    counter += 1;
    output.write(data);
    next();
}, function () {
    console.log('end');
    output.end(function () {
        console.timeEnd("concatenation");
        console.log('done. \ntotal %s lines', counter);
        printMemoryUsage();
        process.exit();
    });
});

setInterval(printMemoryUsage, 2000);

function printMemoryUsage() {
    var info = process.memoryUsage();
    function mb(v) {
        return (v / 1024 / 1024).toFixed(2) + 'MB';
    }
    console.log('rss = %s, heapTotal = %s, heapUsed = %s', mb(info.rss), mb(info.heapTotal), mb(info.heapUsed));
}