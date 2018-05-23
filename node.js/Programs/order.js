var myObject =
{
    foo: "bar",
    func: function ()
    {
        var self = this;
        console.log(this.foo + "3");
        console.log(self.foo + "4");
        (function ()
        {
            console.log(this.foo + "1");
            console.log(self.foo + "2");
        }());
    }
};

myObject.func();

// 理解关键：方法/函数是由谁(对象)调用的，方法/函数内部的 this 就指向谁；

// 注意：被谁调用，不是处于谁的作用域，即使在作用域

// 1、func是由myObject调用的，this指向myObject。
// 2、self指向myObject，相当于myObject的this的副本。
// 3、这个立即执行匿名函数表达式（IIFE）是由window调用的，this指向window。
// 4、IIFE的作用域处于myObject.func的作用域中，本作用域找不到self变量，沿着作用域链向上查找self变量，找到了指向myObject对象的self。