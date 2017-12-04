'use strict';

let data = require('./data');

// let data = '(3x3)XYZ'; // still becomes XYZXYZXYZ, as the decompressed section contains no markers.
// let data = 'X(8x2)(3x3)ABCY'; //  becomes XABCABCABCABCABCABCY, because the decompressed data from the (8x2) marker is then further decompressed, thus triggering the (3x3) marker twice for a total of six ABC sequences.
// let data = '(27x12)(20x12)(13x14)(7x10)(1x12)A'; //  decompresses into a string of A repeated 241920 times.
// let data = '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'; //  becomes 445 characters long.

let dc = decodeCount(data);
console.log(dc);
// console.log(d)
// console.log(d.length);

function decodeCount(str) {
  let weights = new Array(data.length);
  weights.fill(1);
  let total = 0;
  let marker = false;
  let charCount = '';
  let times = '';
  let x = false;
  for (var i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '(') {
      marker = true;
      continue;
    }
    else if (char === ')') {
      for (let n = i + 1; n <= i + parseInt(charCount); n++) {
        weights[n] *= parseInt(times);
      }

      marker = false;
      x = false;
      charCount = '';
      times = '';
    }
    else {
      if (marker) {
        if (char === 'x') {
          x = true;
          continue;
        }
        else if (x) {
          times += char;
        }
        else {
          charCount += char;
        }
      }
      else {
        total += weights[i];
      }
    }
  }
  return total;
}

function decode(str) {
  const re = /^(.*?)\(([x\d]+)\)(.*)$/;
  let decoded = '';
  let m = str.match(re);
  while (m !== null) {
    let [_, pre, marker, rest] = str.match(re);
    // console.log('--> ',pre, marker, rest);
    let [len, rep] = marker.split('x');
    let decoded = '';
    for (let i = 0; i < rep; i++) {
      decoded += rest.slice(0, len);
    }
    str = pre + decoded + rest.slice(len);
    m = str.match(re);
  }
  return str;
}
