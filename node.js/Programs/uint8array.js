process.stdin.once('data', function (buff) {
    // input : aaadsfaw
    var ui8 = new Uint8Array(buff);
    console.log(buff);
    // <Buffer 61 61 61 64 73 66 61 77 0d 0a>
    console.log(ui8);
    /*
    Uint8Array {
        '0': 97,
        '1': 97,
        '2': 97,
        '3': 100,
        '4': 115,
        '5': 102,
        '6': 97,
        '7': 119,
        '8': 13,
        '9': 10 }
    */
    console.log(JSON.stringify(ui8));
    // {"0":97,"1":97,"2":97,"3":100,"4":115,"5":102,"6":97,"7":119,"8":13,"9":10}
});
