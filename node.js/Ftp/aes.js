var crypto = require('crypto');

var data = 'phil';

var encrypt = function (text)
{ 
    var cipher = crypto.createCipher('aes-256-ctr', data);
 	var crypted = cipher.update(text, 'utf8', 'hex'); 
 	crypted += cipher.final('hex'); 
 	return crypted; 
};
  
var decrypt = function (text)
{ 
    var decipher = crypto.createDecipher('aes-256-ctr', data); 
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8'); 
    return dec; 
}; 
  
var hw = encrypt("hello world");
console.log(hw); 
console.log(decrypt(hw)); 
