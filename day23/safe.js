'use strict';

const input = require('./data.js');
// const input = [
//   'cpy 2 a',
//   'tgl a',
//   'tgl a',
//   'tgl a',
//   'cpy 1 a',
//   'dec a',
//   'dec a'
// ];


let pc = 0;
let reg = {
  a: 7,
  b: 0,
  c: 1,
  d: 0
}

const cpu = {
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
    console.log(r, pc, ln, inst);
    if (inst && inst.match(/^(cpy|jnz)/)) {
      console.log('matched', input[ln]);
      if (inst.match(/^jnz/)) {
        input[ln] = input[ln].replace(/^jnz/, 'cpy');
      }
      else {
        input[ln] = input[ln].replace(/^.../, 'jnz');
      }
      console.log(' TGGLED', input[ln]);
    }
    else if (inst && inst.match(/^(inc|dec|tgl)/)) {
      console.log('matched', input[ln]);
      if (inst.match(/^inc/)) {
        input[ln] = input[ln].replace(/^inc/, 'dec');
      }
      else {
        input[ln] = input[ln].replace(/^.../, 'inc');
      }
      console.log(' TGGLED', input[ln]);

    }
    return ++pc;
  }
};

while (pc < input.length) {
  // console.log(pc + '  ', input[pc]);
  let [inst, ...args] = input[pc].split(' ');
  console.log(`pc ${pc}: ${input[pc]} => ${JSON.stringify(reg)}`);
  pc = cpu[inst](...args);

}
logreg();

function logreg() {
  console.log(`pc: ${pc} => ${JSON.stringify(reg)}\n`);
}
