'use strict';

const size = 1000;
const grid = [];
for (let i = 0; i < size; i++) {
  grid.push(Array(size).fill(0));
}

const input = require('./data06');

input.forEach(inst => {
  inst = inst.split(' ');
  if (inst[0] === 'turn') {
    inst.shift();
  }
  let turn = inst[0];
  let start = inst[1].split(',').map(n => parseInt(n));
  let end = inst[3].split(',').map(n => parseInt(n));

  for (let col = start[0]; col <= end[0]; col++) {
    for (let row = start[1]; row <= end[1]; row++) {
      if (turn === 'toggle') {
        grid[row][col] = grid[row][col]+2;
      }
      else {
        grid[row][col] = turn === 'on' ? grid[row][col]+1 : Math.max(grid[row][col]-1,0);
      }
    }
  }
});

// grid.forEach(row => {
//   console.log(row.join(''));
// })
let brightness = grid.reduce((acc, cur) => {
  acc += cur.reduce((a, c) => {
    return a + c;
  }, 0);
  return acc;
}, 0);
console.log('Brightness:', brightness);
