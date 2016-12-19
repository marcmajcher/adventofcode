'use strict';

// const input = 'pvhmgsws';
const input = 'ihgpwlah'; // => DDRRRD
// const input = 'kglvqrro'; // => DDUDRLRRUDRD
// const input = 'ulqzkmiv'; // => DRURDRUDDLLDLUURRDULRLDUUDDDRR

const md5 = require('md5');
const gridSize = 4;
const grid = new Array(gridSize).fill(new Array(gridSize));
const pos = {
  x: 0,
  y: 0
};
