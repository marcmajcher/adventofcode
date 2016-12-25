'use strict';

const input = require('./data.js');

let reg;
let pc;
let output;

const cpu = {
  out: (x) => {
    output += isNaN(parseInt(x)) ? reg[x] : x;
    if ((output.length > 2 && !output.match(/^(01)+0?$/)) || output.length >= 100) {
      stopAndCheck = true;
    }
    return ++pc;
  },
  cpy: (v, r) => {
    reg[r] = isNaN(parseInt(v)) ? reg[v] : parseInt(v);
    return ++pc;
  },
  inc: (r) => {
    reg[r]++;
    return ++pc;
  },
  dec: (r) => {
    reg[r]--;
    return ++pc;
  },
  jnz: (r, d) => {
    r = isNaN(parseInt(r)) ? reg[r] : parseInt(r);
    d = isNaN(parseInt(d)) ? reg[d] : parseInt(d);

    return (r === 0 || reg[r] === 0) ?
      ++pc :
      pc + parseInt(d);
  },
  tgl: (r) => {
    const ln = reg[r] + pc;
    const inst = input[ln];
    if (inst && inst.match(/^(cpy|jnz)/)) {
      if (inst.match(/^jnz/)) {
        input[ln] = input[ln].replace(/^jnz/, 'cpy');
      }
      else {
        input[ln] = input[ln].replace(/^.../, 'jnz');
      }
    }
    else if (inst && inst.match(/^(inc|dec|tgl)/)) {
      if (inst.match(/^inc/)) {
        input[ln] = input[ln].replace(/^inc/, 'dec');
      }
      else {
        input[ln] = input[ln].replace(/^.../, 'inc');
      }
    }
    return ++pc;
  }
};


let count = 0;
let done = false;
let stopAndCheck = false;

while (!done) {
  output = '';
  pc = 0;
  reg = {
    a: count,
    b: 0,
    c: 0,
    d: 0
  }

  while (pc < input.length && !stopAndCheck) {
    let [inst, ...args] = input[pc].split(' ');
    pc = cpu[inst](...args);
  }

  if (output.match(/^(01)+0?$/)) {
    done = true;
    console.log(count);
  }
  stopAndCheck = false;
  count++;
}
