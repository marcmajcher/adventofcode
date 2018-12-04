'use strict';

/* eslint-env node */

const input = require('./day2_input');
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

console.log(c2 * c3);
