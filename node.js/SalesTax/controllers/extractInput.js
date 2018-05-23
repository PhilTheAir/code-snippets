var header = (str) => {
    var s = str.slice(0, str.indexOf(':')) + ': ';
    return 'Out' + s.slice(2);  
};

var theItems = (str) => {
    var regex = /(\d+)\s(.*?)at\s([0-9\.])+/gi;
    return str.match(regex);
};

var theData = (str) => {
    var token = ' at ';
    var space = ' ';
    var posToken = str.indexOf(token);
    var posFirstSpace = str.indexOf(space);
    
    var result = [];
    
    var quantities = str.slice(0, posFirstSpace);
    var subject = str.slice(0, posToken);
    var price = str.slice(posToken + token.length);
    
    result.push(quantities);
    result.push(subject);
    result.push(price);
    
    return result;
};

exports.header = header;
exports.theItems = theItems;
exports.theData = theData;