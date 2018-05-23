var pizza =
{
    toppings: [1, 2, 3],
    color: 'brown',
    numbers: 7
};

console.log(pizza);
console.log(pizza.toppings);
console.log(pizza.color);

var a = 1, b = 2, c = 3;

// output a: 1, b: 8, c: 6
(function firstFunction()
{
    var b = 5, c = 6;
    console.log("(1)" + "a: " + a + ", b: " + b + ", c: " + c);

    (function secondFunction()
    {
        var b = 8;
        console.log("(2)" + "a: " + a + ", b: " + b + ", c: " + c);

        (function thirdFunction()
        {
            var a = 7, c = 9;
            console.log("(3)" + "a: " + a + ", b: " + b + ", c: " + c);

            (function fourthFunction()
            {
                var a = 1, c = 8;
                console.log("(4)" + "a: " + a + ", b: " + b + ", c: " + c);
            })();
        })();
    })();
})();

