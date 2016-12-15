const input = require('./data');

// const input = [
//   'cpy 41 a',
//   'inc a',
//   'inc a',
//   'dec a',
//   'jnz a 2',
//   'dec a'
// ];

let pc = 0;
let reg = {
  a: 0,
  b: 0,
  c: 0,
  d: 0
}

const cpu = {
  cpy: (v, r) => {
    reg[r] = isNaN(parseInt(v)) ? reg[v] : v;
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
    return (r === 0 || reg[r] === 0) ?
      ++pc :
      pc + parseInt(d);
  }
};

while (pc < input.length) {
  // console.log(pc + '  ', input[pc]);
  let [inst, ...args] = input[pc].split(' ');
  pc = cpu[inst](...args);
}
logreg();

function logreg() {
  console.log(`pc: ${pc} => ${JSON.stringify(reg)}\n`);
}
