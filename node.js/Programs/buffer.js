var fs = require('fs');

console.log(new Buffer('bytewiser'));

// input node buffer 1234567890 e:\pop.js

var bytes = process.argv.slice(2).map(Number);
console.log(new Buffer(bytes).toString('hex'));

var file = fs.readFileSync(process.argv[3]);
var offset = 0;
var nl = '\n'.charCodeAt(0);

for (var i = 0; i < file.length; i++)
{
    if (file[i] === nl)
    {
        console.log(file.slice(offset, i));
        i++;
        offset = i;
    }
}
console.log(file.slice(offset, i));

var dot = '.'.charCodeAt(0);
var bang = '!'.charCodeAt(0);

process.stdin.on('data', function (buff)
{
    for (var i = 0; i < buff.length; i++)
    {
        if (buff[i] === dot)
        {
            buff[i] = bang;
        }
    }
    console.log(buff);
});

