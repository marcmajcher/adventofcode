'use strict';

const rows = 6;
const cols = 50;
const grid = [];
const off = '.';
const on = '#';

for (let i = 0; i < rows; i++) {
  grid[i] = new Array(cols);
  grid[i].fill(off);
}

function printGrid() {
  for (let i = 0; i < rows; i++) {
    console.log(grid[i].join(''));
  }
}

function countGrid() {
  let count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === on) {
        count++;
      }
    }
  }
  return count;
}

printGrid();
console.log(countGrid());
