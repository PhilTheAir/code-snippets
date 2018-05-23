var f = require('fs');

f.readFile('heroku.txt', 'utf-8', function (err, data)
{
    if (err)
    {
        console.error(err);
    }
    else
    {
        console.log(data);
    }
});

f.open('heroku.txt', 'r', function (err, fd)
{
    if (err)
    {
        console.error(err);
        return;
    }

    var buf = new Buffer(8);
    f.read(fd, buf, 0, 8, null, function (err, bytesRead, buffer)
    {
        if (err)
        {
            console.error(err);
            return;
        }
        console.log('bytesRead: ' + bytesRead);
        console.log(buffer);
    })
});