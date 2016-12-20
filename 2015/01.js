'use strict';

const input = require('./data01');

let count = 0;
for (let i = 0; i < input.length; i++) {
  count += input[i] === '(' ? 1 : -1;
  if (count < 0) {
    console.log(i+1);
    break;
  }
}
