"use strict";

function generateDeterministicRandomString() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var seed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 42;
  function seedRandom(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < length; i++) {
    seed = seedRandom(seed);
    var randomIndex = Math.floor(seed * characters.length);
    randomString += characters[randomIndex];
    seed++;
  }
  return randomString;
}
module.exports = generateDeterministicRandomString;