'use strict';

let data = require('./data');

// let data = 'ADVENT'; // contains no markers and decompresses to itself with no changes, resulting in a decompressed length of 6.
// let data = 'A(1x5)BC'; // repeats only the B a total of 5 times, becoming ABBBBBC for a decompressed length of 7.
// let data = '(3x3)XYZ'; // becomes XYZXYZXYZ for a decompressed length of 9.
// let data = 'A(2x2)BCD(2x2)EFG'; // doubles the BC and EF, becoming ABCBCDEFEFG for a decompressed length of 11.
// let data = '(6x1)(1x3)A'; // simply becomes (1x3)A - the (1x3) looks like a marker, but because it's within a data section of another marker, it is not treated any differently from the A that comes after it. It has a decompressed length of 6.
// let data = 'X(8x2)(3x3)ABCY'; // becomes X(3x3)ABC(3x3)ABCY (for a decompressed length of 18), because the decompressed data from the (8x2) marker (the (3x3)ABC) is skipped and not processed further.

let d = decode(data);
console.log(d)
console.log(d.length);

function decode(str) {
  const re = /^(.*?)\(([x\d]+)\)(.*)$/;
  let decoded = '';
  let m = str.match(re);
  while (m !== null) {
    let [_, pre, marker, rest] = str.match(re);
    // console.log(pre, marker, rest);
    decoded += pre;
    let [len, rep] = marker.split('x');
    for (let i = 0; i < rep; i++) {
      decoded += rest.slice(0, len);
    }
    str = rest.slice(len);
    m = str.match(re);
  }
  decoded += str;
  return decoded;
}
