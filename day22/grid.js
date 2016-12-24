'use strict';

const input = require('./data');

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
      if (nodeA.x === nodeB.x && nodeA.y === nodeB.y) {
      }
      else {
        if (nodeA.used <= nodeB.avail) {
          count++;
        }
      }
    })
  }
});

console.log(count);
