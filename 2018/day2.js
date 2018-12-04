'use strict';

/* eslint-env node */

const input = require('./day2_input');
// const input = [
//   'abcde',
//   'fghij',
//   'klmno',
//   'pqrst',
//   'fguij',
//   'axcye',
//   'wvxyz',
// ];

function differby(str1, str2) {
  let diff = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      diff++;
    }
  }
  return diff;
}

function getPair() {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (differby(input[i], input[j]) === 1) {
        return [input[i], input[j]];
      }
    }
  }
  return undefined;
}

const pair = getPair();
let out = '';
for (let i = 0; i < pair[0].length; i++) {
  if (pair[0][i] === pair[1][i]) {
    out += pair[0][i];
  }
}

console.log(out);

////// pt1
// const input = [
//   'abcdef',
//   'bababc',
//   'abbcde',
//   'abcccd',
//   'aabcdd',
//   'abcdee',
//   'ababab',
// ];

// let c2 = 0;
// let c3 = 0;

// input.forEach((str) => {
//   let has2 = false;
//   let has3 = false;

//   for (let i = 0; i < str.length; i++) {
//     const count = str.split(str[i]).length - 1;
//     if (count === 2) {
//       has2 = true;
//     }
//     if (count === 3) {
//       has3 = true;
//     }
//   }

//   c2 = has2 ? c2 + 1 : c2;
//   c3 = has3 ? c3 + 1 : c3;
// });

// console.log(c2 * c3);
