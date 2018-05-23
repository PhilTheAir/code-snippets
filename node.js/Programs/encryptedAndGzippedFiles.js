var crypto = require('crypto');
var tar = require('tar');
var zlib = require('zlib');
var concat = require('concat-stream');

// Returns a writable stream. Write tar data to it
var parser = tar.Parse();
// and it will emit entry events for each entry parsed from the tarball.
parser.on('entry', function (e)
{
    if (e.type != 'File')
    {
        return;
    }
    // Creates and returns a hash object, a cryptographic hash with the given algorithm which can be used to generate hash digests
    var h = crypto.createHash('md5', { encoding: 'hex' });
    e.pipe(h).pipe(concat(function (hash)
    {
        console.log(hash + ' ' + e.path);
    }));
});

var cipher = process.argv[2];
var pw = process.argv[3];
process.stdin
    .pipe(crypto.createDecipher(cipher, pw))
    .pipe(zlib.createGunzip())
    .pipe(parser);