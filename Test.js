const lib = {};
var p; //Prototype Shortcut
//Class A 
class A {
  constructor(string) {
    this._test = string;
  }
}
//Example 
(lib.bannerText = function() {

}).prototype = p = new A("Hello");


//P is prototype shortcut
console.log(p); //References A class currently.
//Lib is now a prototype of A, which can now be called with the new operator.
//Plus, we can make periodic changes to the constructor function after assigning
//prototype.
console.log(new lib.bannerText("Hello")) //References A class currently.
console.log(p === lib.bannerText.prototype);
console.log(p);