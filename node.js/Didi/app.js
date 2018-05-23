var readline = require('readline');

var _p = require('./pool.js');
var _r = require('./race.js');

var p = new _p();
var r = new _r();

process.stdin.setEncoding('utf8');
process.stdin.on('readable', function ()
{
    var chunk = process.stdin.read();
    if (chunk != null)
    {
        StoreData(chunk.toString(), p, r);
    }
});

process.stdin.on('close', function ()
{
    SplitStakes(p, r);
});

function StoreData(chunk, p, r)
{
    var reg = /[^$-z]/g;
    var s = new Array();
    s = chunk.replace(reg, '').split(':');
    if (s.length == 4 && s[0] == 'Bet')
    {
        switch (s[1])
        {
            case 'W':
                if (!p.winAccount.hasOwnProperty(s[2]))
                {
                    p.winAccount[s[2]] = parseFloat(s[3]);
                }
                else
                {
                    p.winAccount[s[2]] += parseFloat(s[3]);
                }
                break;

            case 'P':
                if (!p.placeAccount.hasOwnProperty(s[2]))
                {
                    p.placeAccount[s[2]] = parseFloat(s[3]);
                }
                else
                {
                    p.placeAccount[s[2]] += parseFloat(s[3]);
                }
                break;

            case 'E':
                if (!p.exactaAccount.hasOwnProperty(s[2]))
                {
                    p.exactaAccount[s[2]] = parseFloat(s[3]);
                }
                else
                {
                    p.exactaAccount[s[2]] += parseFloat(s[3]);
                }
                break;

            default:
                console.log('Bad input data : %s', chunk);
                break;
        }
    }
    else if (s.length == 4 && s[0] == 'Result')
    {
        r.first = s[1];
        r.second = s[2];
        r.third = s[3];

        process.stdin.destroy();
    }
    else
    {
        console.log('Bad input data : %s', chunk);
    }
}

function SplitStakes(p, r)
{
    p.totalMoneyAndCommissions();

    var winBonus = Divide(p.winLeft, p.winAccount[r.first]);
    var placeBonus1 = Divide((p.placeLeft / 3), p.placeAccount[r.first]);
    var placeBonus2 = Divide((p.placeLeft / 3), p.placeAccount[r.second]);
    var placeBonus3 = Divide((p.placeLeft / 3), p.placeAccount[r.third]);
    var exactaBonus = Divide(p.exactaLeft, p.exactaAccount[r.first + ',' + r.second]);

    console.log('Win:%s:$%s', r.first, winBonus);
    console.log('Place:%s:$%s', r.first, placeBonus1);
    console.log('Place:%s:$%s', r.second, placeBonus2);
    console.log('Place:%s:$%s', r.third, placeBonus3);
    console.log('Exacta:%s:$%s', r.first + ',' + r.second, exactaBonus);
}

function Divide(denominator, numerator)
{
    if (!isNaN(denominator) && !isNaN(numerator) && numerator != 0)
    {
        return (denominator / numerator).toFixed(2);
    }
    else
    {
        return '-';
    }
}

module.exports.StoreData = StoreData;
module.exports.SplitStakes = SplitStakes;
module.exports.Divide = Divide;