'use strict';

/* eslint-env node */

const input = require('./day1_input');
// console.log(input.reduce((a, c) => parseInt(c, 10) + a, 0));

const found = { 0: true };
let freq = 0;
let i = 0;

while (1) {
  freq += parseInt(input[i], 10);
  if (found[freq]) {
    console.log(freq);
    break;
  }
  found[freq] = true;
  i = (i + 1) % input.length;
}
