var a = function(){
    console.log('ABC');
}

function slowFunction(callback){
    callback();
}

slowFunction(a);