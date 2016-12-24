'use strict';

const input = require('./data.js');
// const input = `
// ###########
// #0.1.....2#
// #.#######.#
// #4.......3#
// ###########
// `; // 14 steps

// Simple brute-force BFS takes forever - try another approach in ducts2.js

const wall = '#';
const ducts = input.split('\n').filter(e => e !== '');
const numberOfCheckpoints = input.match(/\d/g).length;

const visited = {};
const start = {
  x: 1,
  y: 1,
  steps: 0,
  numbers: ''
};
const toVisit = [start];

function toKey(loc) {
  return [loc.numbers, loc.x, loc.y].join(':');
}

function getContents(loc) {
  return ducts[loc.y][loc.x];
}

const neighborLocs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1]
];

function getNeighbors(loc) {
  const neighbors = [];
  neighborLocs.forEach(n => {
    const newLoc = {
      x: loc.x + n[0],
      y: loc.y + n[1]
    };
    if (getContents(newLoc) !== wall) {
      neighbors.push(newLoc);
    }
  })
  return neighbors;
}

while (toVisit.length > 0) {
  const location = toVisit.pop();
  // console.log(location);

  if (getContents(location).match(/\d/)) {
    const numbersSeen = new Set(location.numbers.split(''));
    numbersSeen.add(getContents(location));
    location.numbers = [...numbersSeen].sort((a, b) => a - b).join('');
  }

  if (location.numbers.length === numberOfCheckpoints) {
    console.log('WOOOOOO');
    console.log(location);
    break;
  }

  const key = toKey(location);
  if (visited[key] === undefined || visited[key].steps > location.steps) {
    visited[key] = location;
  }

  getNeighbors(location).forEach(loc => {
    if (loc.steps === undefined) {
      loc.steps = location.steps + 1;
    }
    if (loc.numbers === undefined) {
      loc.numbers = location.numbers;
    }
    toVisit.unshift(loc);
  })

}
