var q = require('q')
  , deferred = q.defer();

deferred.promise.then(console.log);


// The Promises/A+ spec declares that promises MUST fire their resolution/rejection
// function on the same turn of the event loop that they are created on.  This is
// very important because it eliminates the possibility of execution order
// varying and resulting in indeterminate outcomes.

// You can expect that the functions passed to the "then" method of a promise will be
// called on the NEXT turn of the event loop.

// The script below will pass and show you that despite the promise being resolved synchronously,
// the provided function is not executed until the next turn of the event loop.

// Thus, you should see "FIRST", "SECOND"

deferred.resolve("SECOND");
console.log("FIRST");

function attachTitle(name)
{
    return "DR. " + name;
}

deferred.promise
.then(attachTitle)
.then(console.log);

deferred.resolve("MANHATTAN");

function iterate(num)
{
    console.log(num);
    return ++num;
};

function throwMyGod()
{
    throw new Error("OH NOES");
};

q.fcall(iterate, 1)
.then(iterate)
.then(iterate)
.then(iterate)
.then(iterate)
.then(throwMyGod)
.then(iterate)
.then(iterate)
.then(iterate)
.then(iterate)
.then(iterate)
.then(null, console.log);
