var asyncLoop = function(o){
    var i=-1;

    var loop = function(){
        i++;
        if(i==o.length){o.callback(); return;}
        o.functionToLoop(loop, i);
    } 
    loop();//init
}
USAGE:

asyncLoop({
    length : 5,
    functionToLoop : function(loop, i){
        setTimeout(function(){
            console.log('Iteration ' + i);
            loop();
        },1000);
    },
    callback : function(){
        console.log('All done!');
    }    
});
