'use strict';

const data = require('./data');

// const data = `eedadn
// drvtee
// eandsr
// raavrd
// atevrs
// tsrnev
// sdttsa
// rasrtv
// nssdts
// ntnada
// svetve
// tesnvt
// vntsnd
// vrdear
// dvrsen
// enarar`; // => easter

const counts = [{},{},{},{},{},{},{},{}];

data.split('\n').forEach((e) => {
  for (let i=0; i<counts.length; i++) {
    counts[i][e[i]] = counts[i][e[i]]?counts[i][e[i]]+1:1;
  }
});

console.log(decode(counts));

function decode(counts) {
  let message = '';
  counts.forEach((obj) => {
    message += Object.keys(obj).reduce((last, curr) => {
      return obj[last]<obj[curr]?last:curr;
    });
  });
  return message;
}
