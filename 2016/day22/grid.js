'use strict';

// const input = require('./data');
const input = [
  '/dev/grid/node-x0-y0   10T    8T     2T   80%',
  '/dev/grid/node-x0-y1   11T    6T     5T   54%',
  '/dev/grid/node-x0-y2   32T   28T     4T   87%',
  '/dev/grid/node-x1-y0    9T    7T     2T   77%',
  '/dev/grid/node-x1-y1    8T    0T     8T    0%',
  '/dev/grid/node-x1-y2   11T    7T     4T   63%',
  '/dev/grid/node-x2-y0   10T    6T     4T   60%',
  '/dev/grid/node-x2-y1    9T    8T     1T   88%',
  '/dev/grid/node-x2-y2    9T    6T     3T   66%'
]

const nodes = [];

input.forEach(line => {
  const [_, x, y, size, used, avail, usep] = line.match(
    /^\/dev\/grid\/node\-x(\d+)\-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+%)$/
  ).map(e => parseInt(e));
  nodes.push({
    x,
    y,
    size,
    used,
    avail
  });
});

let count = 0;
nodes.forEach(nodeA => {
  if (nodeA.used !== 0) {
    nodes.forEach(nodeB => {
      if (nodeA.x === nodeB.x && nodeA.y === nodeB.y) {}
      else {
        if (nodeA.used <= nodeB.avail) {
          count++;
        }
      }
    })
  }
});

// http://codepen.io/anon/pen/BQEZzK/?editors=1010

console.log(count);
