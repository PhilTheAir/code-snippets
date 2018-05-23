var toString = Object.prototype.toString;

var isType = function (type) {
    return function (obj) {
        // predefined_Object.method().call(new_Object);
        return toString.call(obj) === '[object ' + type + ']';
        // func1.call(this, arg1, arg2) <=> func1.apply(this, [arg1, arg2])
    };
};

var isString = isType('String');
var isFunction = isType('Function');

console.log(isString('isString'));
// true
console.log(isFunction(isFunction));
// true
console.log(isFunction(isString));
// true