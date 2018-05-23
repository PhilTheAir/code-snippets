var extractInput = require('./controllers/extractInput');
var SalesTax = require('./controllers/SalesTax');

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    var chunk = process.stdin.read();
    if (chunk !== null && chunk.trim() !== '') {
        var output = extractInput.header(chunk);
        var tax = 0;
        var total = 0;
        var items = extractInput.theItems(chunk);
        if (items !== null) {
            items.forEach((item, index, items) => {
                var arr = extractInput.theData(item);
                var st = new SalesTax(arr[0], arr[1], arr[2]);
                output += st.writeConsole();
                tax += parseFloat(st.calcTax());
                total += parseFloat(st.calcPriceWithTax());
            });
            output += 'Sales Taxes: ' + tax.toFixed(2);
            output += ' Total: ' + total.toFixed(2);
            console.log(output);
        }
    }
});
