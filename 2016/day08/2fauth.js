'use strict';

const rows = 6;
const cols = 50;
// const rows = 3;
// const cols = 7;
const grid = [];
const off = ' ';
const on = '#';

const data = require('./data');
// const data = [
//   'rect 3x2',
//   'rotate column x=1 by 1',
//   'rotate row y=0 by 4',
//   'rotate column x=1 by 1'
// ];

// fill grid
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

const commands = {
  rect: function(args) {
    let [cols, rows] = args[0].split('x');
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = on;
      }
    }
  },
  rotate: function(args) {
    let [cr, which, _, amt] = args;
    let [xy, id] = which.split('=');
    if (cr === 'column') {
      for (let i = 0; i < amt; i++) {
        let tmp = grid[rows - 1][id];
        for (let j = rows - 1; j > 0; j--) {
          grid[j][id] = grid[j - 1][id];
        }
        grid[0][id] = tmp;
      }
    }
    else if (cr === 'row') {
      for (let i = 0; i < amt; i++) {
        let tmp = grid[id][cols - 1];
        for (let j = cols - 1; j > 0; j--) {
          grid[id][j] = grid[id][j - 1];
        }
        grid[id][0] = tmp;
      }
    }
  }
};

data.forEach((el) => {
  let [cmd, ...rest] = el.split(' ');
  commands[cmd](rest);
});

printGrid();
