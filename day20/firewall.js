'use strict';

const input = require('./data');
const highestIp = 4294967295;
// const highestIp = 15;
// const input = [
//   '0-3',
//   '6-10'
// ];

const ips = {};
input.forEach(i => {
  let [start, end] = i.split('-');
  ips[parseInt(start)] = parseInt(end);
})

let keys = Object.keys(ips).sort((a, b) => a - b);
let max = ips[0];
let count = 0;

for (var i = 0; i < keys.length; i++) {
  const key = keys[i];
  const value = ips[key];
  if (key <= max + 1) {
    max = Math.max(max, value);
  }
  else {
    count += key - (max + 1);
    max = value;
    if (i === keys.length - 1) {
      count += highestIp - max;
    }
  }
}

console.log('Count', count);
