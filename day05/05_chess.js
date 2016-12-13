'use strict';

const md5 = require('md5');
const input = 'reyedfim';
let index = 0;
let found = 0;
let code = '--------'.split('');

while (found < 8) {
  let hash = md5(input + index);
  if (hash.match(/^00000/)) {
    let m = hash.match(/^00000(.)(.)/);
    if (m[1] >= 0 && m[1] <= 7) {
      if (code[m[1]] === '-') {
        code[m[1]] = m[2];
        console.log(code.join(''));
        found++;
      }
    }
  }
  index++;
}

console.log(code.join(''));
