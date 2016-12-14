'use strict';

// const data = require('./data');

const data = [
  'abba[mnop]qrst', // supports TLS (abba outside square brackets).
  'abcd[bddb]xyyx', // does not support TLS (bddb is within square brackets, even though xyyx is outside square brackets).
  'aaaa[qwer]tyui', // does not support TLS (aaaa is invalid; the interior characters must be different).
  'ioxxoj[asdfgh]zxcvbn' // supports TLS (oxxo is outside square brackets, even though it's within a larger string).
];

data.forEach((ip) => {
  console.log(ip);
});
