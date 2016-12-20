'use strict';

const input = require('./data');

const ips = {};
input.forEach(i => {
  let [start, end] = i.split('-');
  ips[parseInt(start)] = parseInt(end);
})

let start = 0;
let keys = Object.keys(ips).sort((a,b) => a-b);

let max = ips[start];
//
// keys.forEach(k => {
//   console.log(k, ips[k]);
// })

for (var i = 0; i < keys.length; i++) {
  const key = keys[i];
  const value = ips[key];
  if (key <= max+1) {
    max = Math.max(max, value);
  }
  else {
    console.log(max+1);
    break;
  }
}
