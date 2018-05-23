var method = Race.prototype;

function Race()
{
    this.first = '';
    this.second = '';
    this.third = '';
}

Race.prototype =
{
    constructor: Race,

    getFirst: function () { return this.first },

    getSecond: function () { return this.second },

    getThird: function () { return this.third },

    setFirst: function (value) { this.first = value },

    setSecond: function () { this.second = value },

    setThird: function () { this.third = value }
}

module.exports = Race;