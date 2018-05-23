var util = require('util');
function Person() 
{
    this.name = 'byvoid';
    this.toString = function() 
    {
        return this.name;
    };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));

// 另有util.isArray()、util.isRegExp()、util.isDate()、util.isError() 四个类型测试工具，
// 以及 util.format()、util.debug() 等工具