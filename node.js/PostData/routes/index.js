var express = require('express');
var router = express.Router();

var responseData = require('../controllers/responseData.js').resData;

router.get('/', function(req, res, next) {
  res.status(400).json({ error: 'Please POST me the data.' });
});

router.post('/', function(req, res, next) {
  if (!req.body || !req.body.payload) {
    res.status(400).json({ error: 'Could not decode request: JSON parsing failed' });
    return;
  }
  var d = responseData(req.body.payload);
  res.json({ response: d });
});


module.exports = router;
