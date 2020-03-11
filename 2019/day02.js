'use strict';

/* eslint-env node */

const input = require('./day02_input');

function runIntCode(prog, index = 0) {
  while (index >= 0) {
    index = runOpCode(prog, index);
  }
  return prog[0];
}

function runOpCode(prog, index) {
  if (prog[index] === 99) {
    return -1;
  }
  const [op, p1, p2, loc] = prog.slice(index, index + 4);
  // console.log('index:', index, 'op:', op, 'p1:', p1, 'p2:', p2, 'loc:', loc);
  if (op === 1) {
    prog[loc] = prog[p1] + prog[p2];
  } else if (op === 2) {
    prog[loc] = prog[p1] * prog[p2];
  } else {
    return -1;
  }
  return index + 4;
}

// brute force
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    const memory = input.slice(0);
    memory[1] = i;
    memory[2] = j;
    const result = runIntCode(memory);
    if (result === 19690720) {
      console.log(i, j);
      process.exit();
    }
  }
}
console.log('bah');
