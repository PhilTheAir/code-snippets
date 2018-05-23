var assert = require("assert");

var app = require('../app');
var _r = require('../race');
var _p = require('../pool');

describe("stdin & analyse & stdout", function ()
{
    describe("stdin", function ()
    {
        var r = new _r();
        var p = new _p();

        app.StoreData('Bet:￼￼￼￼￼W:2:3', p, r);
        app.StoreData('Bet:P:1:31', p, r);
        app.StoreData('Bet:P:2:22', p, r);
        app.StoreData('Bet:P:3:15', p, r);
        app.StoreData('Bet:E:2,3:13', p, r);
        app.StoreData('Result:2:3:1', p, r);

        app.SplitStakes(p, r);

        before(function ()
        {
            //
        });
        
        beforeEach(function ()
        {
            // bddStdin();
        });

        afterEach(function ()
        {
            //
        });

        after(function ()
        {
            //
        });

        it("analyse & output", function ()
        {
            assert.equal(p.winAccount[2], 3);
            assert.equal(p.placeAccount[1], 31);
            assert.equal(p.exactaAccount['2,3'], 13);
            assert.equal(r.first, '2');
            assert.equal(r.second, '3');
            assert.equal(r.third, '1');

            assert.equal(app.Divide('a', 0), '-');
        });
    });
});

