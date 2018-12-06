'use strict';

/* eslint-env node */

const input = require('./day5_input');
// const input = 'dabAcCaCBAcCcaDA';

let match = true;
let tmparr;
let working = input;

while (match) {
  match = false;
  tmparr = [];
  for (let i = 0; i < working.length; i++) {
    if (working.charCodeAt(i) === working.charCodeAt(i + 1) + 32 ||
        working.charCodeAt(i) === working.charCodeAt(i + 1) - 32) {
      match = true;
      i++;
    }
    else {
      tmparr.push(working[i]);
    }
  }
  working = tmparr.join('');
}

console.log(working.length);
