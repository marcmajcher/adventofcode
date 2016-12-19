'use strict';

const input = 'pvhmgsws';

// const input = 'ihgpwlah'; // => longest: 370
// const input = 'kglvqrro'; // => longest: 492
// const input = 'ulqzkmiv'; // => longest: 830

const md5 = require('md5');
const gridSize = 4;
const grid = new Array(gridSize).fill(new Array(gridSize));
const start = [0, 0];
const target = [3, 3];
const path = '';
const dirs = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0]
};

function openings(path) {
  const hash = md5(input + path).slice(0, 4);
  let open = '';
  for (let i = 0; i < 4; i++) {
    if (hash[i].match(/^[b-f]$/)) {
      open += 'UDLR' [i];
    }
  }
  return open;
}

function move(pos, dir) {
  let newPos = [pos[0] + dirs[dir][0], pos[1] + dirs[dir][1]];
  if (newPos[0] >= 0 && newPos[0] < gridSize &&
    newPos[1] >= 0 && newPos[1] < gridSize) {
    return newPos;
  }
  return false;
}

const movesToTry = [{
  pos: start,
  path: '',
  moves: 0
}];

let longestMove = {moves:0};

while (movesToTry.length > 0) {
  const thisMove = movesToTry.pop();
  if (thisMove.pos[0] === target[0] && thisMove.pos[1] === target[1]) {
    if (thisMove.moves > longestMove.moves) {
      longestMove = thisMove;
    }
  }
  else {
    let open = openings(thisMove.path);
    for (let i = 0; i < open.length; i++) {
      let dir = open[i];
      let newPos = move(thisMove.pos, dir);
      if (newPos) {
        movesToTry.unshift({
          pos: newPos,
          path: thisMove.path + dir,
          moves: thisMove.moves + 1
        });
      }
    }
  }
}

console.log('LONGEST:', longestMove.moves);
