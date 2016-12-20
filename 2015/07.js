'use strict';

const input = require('./data07.js');
// const input = [
//   '123 -> x',
//   '456 -> y',
//   'x AND y -> d',
//   'x OR y -> e',
//   'x LSHIFT 2 -> f',
//   'y RSHIFT 2 -> g',
//   'NOT x -> h',
//   'NOT y -> i'
// ];

// e: 507
// f: 492
// g: 114
// h: 65412
// i: 65079
// x: 123
// y: 456

const maxInt = 65535;
const wires = {};
const outs = {};
let indent = '';

input.forEach(i => {
  let [val, wire] = i.split(' -> ');
  wires[wire] = val;
});

const operators = {
  AND: (x, y) => {
    return x & y;
  },
  OR: (x, y) => {
    return x | y;
  },
  LSHIFT: (x, y) => {
    return x << y;
  },
  RSHIFT: (x, y) => {
    return x >>> y;
  }
};

let resolve = function(key, from) {
  console.log(indent, 'RES:', key, '<=', wires[key], ' FROM:', from);
  if (!isNaN(key)) { // just a number
    return key;
  }
  if (typeof outs[key] !== 'undefined') { // already found it
    return outs[key];
  }
  indent += '  ';
  if (!isNaN(wires[key])) { // get a number from a wire
    outs[key] = parseInt(wires[key]);
  }
  else {
    let thingy = wires[key];
    let parts = thingy.split(' ');
    if (parts[0] === 'NOT') {
      outs[key] = maxInt & ~resolve(parts[1], thingy);
    }
    else if (parts[1] in operators) {
      let left = resolve(parts[0], thingy);
      let right = resolve(parts[2], thingy);
      outs[key] = operators[parts[1]](left, right);
    }
    else { // this doesn't look like anything to me
      return resolve(parts[0]);
    }
  }
  indent = indent.slice(2);
  return outs[key];
}

// console.log(wires);
console.log(resolve('a', undefined));
