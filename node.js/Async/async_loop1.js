function asyncLoop(iterations, func, callback) 
{
    var index = 0;
    var done = false;
    var loop = 
    {
        next: function() 
        {
            if (done) { return; }

            if (index < iterations) 
            {
                index++;
                func(loop);
            } 
            else 
            {
                done = true;
                callback();
            }
        },

        iteration: function() 
        {
            return index - 1;
        },

        break: function() 
        {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
}

function someFunction(a, b, callback) 
{
    console.log('Hey doing some stuff!');
    callback();
}

asyncLoop(10, function(loop) 
{
    someFunction(1, 2, function(result) 
    {
        console.log(loop.iteration());
        loop.next();
    })},
    function(){console.log('cycle ended')}
);
