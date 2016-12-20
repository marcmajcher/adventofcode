'use strict';

const md5 = require('md5');
const input = 'ckczppom';

let count = 0;
let found = false;

while (!found) {
  const key = input + count;
  const hash = md5(key);
  if (hash.match(/^000000/)) {
    console.log('Found:',count);
    found = true;
  }
  count++;
}
