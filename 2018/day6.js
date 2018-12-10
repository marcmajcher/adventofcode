'use strict';

/* eslint-env node */

// const input = require('./day6_input');
const input = [
  [1, 1],
  [1, 6],
  [8, 3],
  [3, 4],
  [5, 5],
  [8, 9],
];
const points = input.map(e => ({ x: e[0], y: e[1] }));
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// find outer bounds
const nwse = points.reduce((a, c) => {
  const nw = { x: Math.min(c.x, a.nw.x), y: Math.min(c.y, a.nw.y) };
  const se = { x: Math.max(c.x, a.nw.x), y: Math.max(c.y, a.nw.y) };
  return { nw, se };
}, { nw: points[0], se: points[0] });

console.log(nwse);

// traverse grid from nw->se, for each point, find closest coordinate, increment count
// for that coordinate. if grid point is on edge, disqualify coordinate (infinite)

function manhattanDistance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function findClosest(coords, point) {
  const distances = coords.map(e => manhattanDistance(e, point));
  const min = Math.min.apply(null, distances);
  if (distances.filter(e => e === min).length === 1) {
    const i = distances.indexOf(min);
    // return i;
    if (coords[i].x === point.x && coords[i].y === point.y) {
      return LETTERS[i];
    }
    return letters[i];
  }
  return '.';
}

const counts = new Array(points.length).fill(0);
const invalid = [];

for (let y = nwse.nw.y; y <= nwse.se.y; y++) {
  let grid = '';
  for (let x = nwse.nw.x; x <= nwse.se.x; x++) {

    grid += findClosest(points, { x, y });
  }
  console.log(grid);
}
