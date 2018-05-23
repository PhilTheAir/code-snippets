var invalidJSON = (err, req, res, next) => {
  if (err.message.indexOf('json') > -1) {
    res.status(400).json({ error: 'Could not decode request: JSON parsing failed' });
  }
  next(err);
};

exports.invalidJSON = invalidJSON;