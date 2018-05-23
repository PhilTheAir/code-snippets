var exemptProducts = require('../public/exemptProducts.json');
var rates = require('../public/rates.json');

var SalesTax = function(quantities, subject, price) {
    this.quantities = quantities;
    this.subject = this.setContent(subject);
    this.price = price;
}

SalesTax.prototype.setContent = function(subject) {
    var token = ' imported ';
    if (subject.indexOf(token) !== -1) {
        subject = subject.replace(token, ' ');
        var pos = subject.indexOf(this.quantities) + (this.quantities + ' ').length;
        subject = this.quantities + token + subject.slice(pos);
    }
    return subject + ' ';
};

SalesTax.prototype.basicTax = function(subject) {
    var basic = rates.basic;
    var exempt = rates.exempt;
    var books = exemptProducts.book;
    var food = exemptProducts.food;
    var medicine = exemptProducts.medicine;
    var arr = books.concat(food).concat(medicine);
    for (var i = 0; i < arr.length; i ++ ) {
        var regex = new RegExp('\\s' + arr[i] + '(s?)\\s', 'gi');
        if (regex.test(subject)) {
            return exempt;
        }
    }
    return basic;
};

SalesTax.prototype.importDuty = function(subject) {
    var token = ' imported ';
    var importRate = rates.importRate;
    var nonImport = rates.nonImport;
    if (subject.indexOf(token) !== -1) {
        return importRate;
    }
    else {
        return nonImport;
    }
};

SalesTax.prototype.roundUp = function(value) {
    return (Math.ceil(value * 20) / 20).toFixed(2);
};

SalesTax.prototype.calcTax = function() {
    var tax =  parseFloat(this.price) * (this.basicTax(this.subject) + this.importDuty(this.subject));
    return this.roundUp(tax);
};

SalesTax.prototype.calcPriceWithTax = function() {
    var price = parseFloat(this.price) + parseFloat(this.calcTax());
    return price.toFixed(2);
};

SalesTax.prototype.writeConsole = function() {
    var s = this.subject.trim();
    s += ': ' + this.calcPriceWithTax() + ' ';
    return s;
};

module.exports = SalesTax;