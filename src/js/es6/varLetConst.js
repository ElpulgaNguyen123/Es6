const a = 123;
var sumX = (a = 2, b) => { 
    console.log(a*b);
 }

 sumX(2);