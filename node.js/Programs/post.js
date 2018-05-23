var request = require('request');

// To post JSON data
request({
    url: "http://localhost:3000",
    method: "POST",
    json: true,
    body: { form: { pp: 'QQQ' } },
}, function (error, response, body) {
    // posted back data
    console.log(response.body);
});

// To post xml data:
/*
request({
    url: "http://localhost:3000",
    method: "POST",
    headers: {
        "content-type": "application/xml",  
    },
    body: '<xml>...........</xml>'
}, function (error, response, body){
    console.log(response);
});
*/