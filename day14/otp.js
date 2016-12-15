'use strict';

const md5 = require('md5');
const salt = 'yjdafjpo';
// const salt = 'abc';
let index = -1;
let hashes = [];

while (hashes.length < 64) {
  index++;
  const hash = md5(salt + index);
  const m = hash.match(/(.)\1\1/);
  if (m) {
    const char = m[1];
    const re = new RegExp(`(${char})\\1{4}`);
    for (var i = 1; i <= 1000; i++) {
      const index2 = index+i;
      const hash2 = md5(salt + index2);
      if (hash2.match(re)) {
        hashes.push({
          index,
          hash
        });
        break;
      }
    }
  }
}
console.log(hashes);
console.log(index);
