'use strict';

// const input = require('./data08');
const inputb = require('./data08b');

let totalc = 0;
let totalb = 0;
for (let i = 0; i < inputb.length; i++) {
  // total += input[i].length;
  totalb += inputb[i].length;
  inputb[i] = inputb[i]
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');
  totalc += inputb[i].length + 2;
}
console.log(totalc - totalb);
