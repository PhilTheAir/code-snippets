var getContent = (url) => {
  return new Promise((resolve, reject) => {
    var lib = url.startsWith('https') ? require('https') : require('http');
    var request = lib.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      var body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => {
      console.log(err);   
      request.setTimeout(10000, () => {
        getContent(url);
      });
    });
  });
};

exports.getContent = getContent;
