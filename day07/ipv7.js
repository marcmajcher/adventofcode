'use strict';

const data = require('./data');

// const data = [
//   'abba[mnop]qrst', // supports TLS (abba outside square brackets).
//   'abcd[bddb]xyyx', // does not support TLS (bddb is within square brackets, even though xyyx is outside square brackets).
//   'aaaa[qwer]tyuibcf', // does not support TLS (aaaa is invalid; the interior characters must be different).
//   'ioxxoj[asdfgh]zxcvbn' // supports TLS (oxxo is outside square brackets, even though it's within a larger string).
// ];

let count = 0;

data.forEach((ip) => {
  if (!ip.match(/\[\w*(.)(.)\2\1\w*\]/)) {
    let m = ip.match(/(.)(.)\2\1/g);
    if (m !== null) {
      for (let i = 0; i < m.length; i++) {
        if (!m[i].match(/(.)\1{3}/)) {
          console.log(ip);
          count++;
          break;
        }
      }
    }
  }
});

console.log(count);
