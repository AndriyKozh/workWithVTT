(function () {
  var a = (b = 3);
})();
console.log(typeof a !== "undefined");
console.log(typeof b !== "undefined");
