var fs = require('fs');
var xml2js = require('xml2js');
var http = require('http');

var parser = new xml2js.Parser();

var url = 'http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?symbol=sz002236&end_date=20150415&begin_date=20150408';

var req = http.get(url, function (res) {
    var xml = '';
    res.on('data', function (chunk) {
        xml += chunk;
    });

    res.on('end', function () {
        parser.parseString(xml, function (err, result) {
            console.log(result);
            // { control: { content: [ [Object], [Object], [Object], [Object], [Object], [Object] ] } }
            console.log(JSON.stringify(result));
            /*
                {"control":{"content":[{"$":{"d":"2015-04-08","o":"41.100","h":"41.300","c":"39.880","l":"38.000","v":"390640","bl":""}},{"$":{"d":"2015-04-09","o":"39.550","h":"40.480","c":"39.960","l":"36.010","v":"396581","bl":""}},{"$":{"d":"2015-04-10","o":"39.000","h":"40.990","c":"40.460","l":"38.700","v":"301953","bl":""}},{"$":{"d":"2015-04-13","o":"40.500","h":"40.980","c":"39.760","l":"39.310","v":"330573","bl":""}},{"$":{"d":"2015-04-14","o":"39.810","h":"39.810","c":"38.220","l":"38.100","v":"310061","bl":""}},{"$":{"d":"2015-04-15","o":"38.210","h":"39.000","c":"37.700","l":"37.000","v":"250745","bl":""}}]}}
            */
            console.log(JSON.parse(JSON.stringify(result)));
            // { control: { content: [ [Object], [Object], [Object], [Object], [Object], [Object] ] } }
        });
    });
});

req.on('error', function (err) {
    console.log('request met an error ... ');
});
