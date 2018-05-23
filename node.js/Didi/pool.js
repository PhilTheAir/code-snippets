var method = Pool.prototype;

function Pool()
{
    this.winCommissionRate = 0.15;
    this.placeCommissionRate = 0.12;
    this.exactaCommissionRate = 0.18;

    this.winAccount = new Array();
    this.placeAccount = new Array();
    this.exactaAccount = new Array();
    
    this.winCommission = 0;
    this.placeCommission = 0;
    this.exactaCommission = 0;

    this.winLeft = 0;
    this.placeLeft = 0;
    this.exactaLeft = 0;
}

Pool.prototype =
{
    constructor: Pool,

    getWinAccount: function () { return this.winAccount },

    getPlaceAccount: function () { return this.placeAccount },

    getExactaAccount: function () { return this.exactaAccount },

    getWinLeft: function () { return this.winLeft },

    getPlaceLeft: function () { return this.placeLeft },

    getExactaLeft: function () { return this.exactaLeft },

    totalMoneyAndCommissions: function ()
    {
        var winTotle = 0;
        var placeTotle = 0;
        var exactaTotle = 0;

        if ((this.winAccount.length + this.placeAccount.length + this.exactaAccount.length) != 0)
        {
            for (var k in this.winAccount)
            {
                winTotle += this.winAccount[k];
            }
            for (var k in this.placeAccount)
            {
                placeTotle += this.placeAccount[k];
            }
            for (var k in this.exactaAccount)
            {
                exactaTotle += this.exactaAccount[k];
            }

            this.winCommission = winTotle * this.winCommissionRate;
            this.placeCommission = placeTotle * this.placeCommissionRate;
            this.exactaCommission = exactaTotle * this.exactaCommissionRate;

            this.winLeft = winTotle - this.winCommission;
            this.placeLeft = placeTotle - this.placeCommission;
            this.exactaLeft = exactaTotle - this.exactaCommission;
        }
    }
}

module.exports = Pool;