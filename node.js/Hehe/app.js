var express = require('express');
var bodyParser = require('body-parser');
var underscore = require('underscore');

var app = express();
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Started server on port : ' + port);

app.use(bodyParser.json());
app.use(throwError);

app.route('/')
    .get(donotGet)
    .post(dateFilter);

function throwError(err, req, res, next)
{
    if (err.message.indexOf('json') > -1)
    {
        res.status(400).json({ error: 'Could not decode request: JSON parsing failed' });
    }
    next(err);
};

function donotGet(req, res)
{
    res.status(400).json({ error: 'Data should be posted.' });
};

function dateFilter(req, res)
{
    if (!req.body || !req.body.payload)
    {
        res.status(400).json({ error: 'Could not decode request: JSON parsing failed' });
        return;
    }
    var returnData = underscore.chain(req.body.payload)
        .filter(function (_json)
        {
            return _json.drm && _json.episodeCount > 0;
        })
        .map(function (_json)
        {
            return { image: _json.image.showImage,
                     slug: _json.slug,
                     title: _json.title };
        })
        .value();
    res.json({ response: returnData });
};

module.exports.throwError = throwError;
module.exports.donotGet = donotGet;
module.exports.dateFilter = dateFilter;