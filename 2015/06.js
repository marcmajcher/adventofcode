'use strict';

const size = 1000;
const grid = [];
for (let i = 0; i < size; i++) {
  grid.push(Array(size).fill(false));
}

// const input = [
//   'turn on 0,0 through 9,9',
//   'toggle 0,0 through 9,0',
//   'turn off 4,4 through 5,5'
// ];
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
        grid[row][col] = !grid[row][col];
      }
      else {
        grid[row][col] = turn === 'on' ? true : false;
      }

    }
  }
});

// grid.forEach(row => {
//   console.log(row.map(on => on ? '*' : '.').join(''));
// })
let lights = '';
grid.forEach(row=> {
  lights += row.map(on => on ? '*' : '.').join('');
})
console.log('Lit:',lights.match(/\*/g).length);
