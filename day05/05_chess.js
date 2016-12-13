'use strict';

const md5 = require('md5');
const input = 'reyedfim';
let index = 0;
let found = 0;
let code = '';

while (found < 8) {
  let hash = md5(input+index);
  if (hash.match(/^00000/)) {
    let m = hash.match(/^00000(.)/);
    code += m[1];
    found++;
  }
  index++;
}

console.log(code);
