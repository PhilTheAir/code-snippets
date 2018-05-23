var chai = require('chai');
var expect = chai.expect;
var extractInput = require('../controllers/extractInput');
var SalesTax = require('../controllers/SalesTax');

describe('Test controllers/extractInput.js', function() {

  var s;
  
  beforeEach(function() {
    s = 'Input 3: 1 imported bottle of perfume at 27.99 1 bottle of perfume at 18.99 1 packet of headache pills at 9.75 1 box of imported chocolates at 11.25';
  });

  afterEach(function() {
  });

  it('return correct header', function() {
    expect(extractInput.header(s)).to.equal('Output 3: ');
  });
  
  it('return correct items array', function() {
    expect(extractInput.theItems(s)[0]).to.equal('1 imported bottle of perfume at 27.99');
    expect(extractInput.theItems(s)[1]).to.equal('1 bottle of perfume at 18.99');
    expect(extractInput.theItems(s)[2]).to.equal('1 packet of headache pills at 9.75');
    expect(extractInput.theItems(s)[3]).to.equal('1 box of imported chocolates at 11.25');
  });
  
  it('return correct data in the item', function() {
    expect(extractInput.theData('1 imported bottle of perfume at 27.99')[0]).to.equal('1');
    expect(extractInput.theData('1 imported bottle of perfume at 27.99')[1]).to.equal('1 imported bottle of perfume');
    expect(extractInput.theData('1 imported bottle of perfume at 27.99')[2]).to.equal('27.99');
  });

});

describe('Test controllers/SalesTax.js', function() {

  var st;
  
  beforeEach(function() {
    st = new SalesTax('1', '1 bottle of imported perfume', '27.99');
  });

  afterEach(function() {
  });

  it('return correct subject', function() {
    expect(st.subject).to.equal('1 imported bottle of perfume ');
  });
  
  it('return correct basic tax', function() {
    expect(st.basicTax(st.subject)).to.equal(0.1);
  });
  
  it('return correct import duty', function() {
    expect(st.importDuty(st.subject)).to.equal(0.05);
  });
  
  it('np/100 rounded up to the nearest 0.05', function() {
    expect(st.roundUp(2.33)).to.equal('2.35');
  });
  
  it('return correct tax', function() {
    expect(st.calcTax()).to.equal('4.20');
  });
  
  it('return correct price plus tax', function() {
    expect(st.calcPriceWithTax()).to.equal('32.19');
  });
  
  it('return correct toString()', function() {
    expect(st.writeConsole()).to.equal('1 imported bottle of perfume: 32.19 ');
  });
  
});