'use strict';

const input = require('./data05.js');

let nice = 0;
input.forEach(el => {
  if (el.match(/(..).*\1/) &&
    el.match(/(.).\1/)) {
    nice++;
  }
});
console.log(nice);
