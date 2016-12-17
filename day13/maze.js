'use strict';

const pq = require('js-priority-queue');

const data = 1352;
// const data = 10;

const c_empty = '.';
const c_wall = '#';
const c_dunno = '?';

const grid = [];
const start = {
  x: 1,
  y: 1
};
const dest = {
  x: 31,
  y: 39
};
// const dest = {
//   x: 7,
//   y: 4
// };

function getPoint(x, y) {
  if (x < 0 || y < 0) {
    return c_wall;
  }

  if (x > 49 || y > 49) {
    return c_wall;
  }

  if (!grid[y]) {
    grid[y] = [];
  }
  if (!grid[y][x]) {
    let num = x * x + 3 * x + 2 * x * y + y + y * y + data;
    let bin = num.toString(2);
    let ones = bin.split('1').length - 1;
    grid[y][x] = (ones & 1) ? c_wall : c_empty;
  }
  return grid[y][x];
}

function drawGrid() {
  let gridSize = grid.reduce((acc, curr) => {
    return Math.max(acc, curr.length)
  }, 0);
  let xrow = '    ';
  let drow = '----';
  for (let i = 0; i < gridSize; i++) {
    xrow += i % 10;
    drow += '-';
  }
  console.log(xrow);
  console.log(drow);

  for (let y = 0; y < gridSize; y++) {
    if (!grid[y]) {
      grid[y] = [];
    }
    let row = y < 100 ? (y < 10 ? '  ' : ' ') : '';
    row += y + ' ';
    for (let i = 0; i < gridSize; i++) {
      row += grid[y][i] || c_dunno;
    }
    console.log(row);
  }
}

function getNeighbors(pos) {
  let narr = [];
  const ncells = [{
    x: -1,
    y: 0
  }, {
    x: 1,
    y: 0
  }, {
    x: 0,
    y: 1
  }, {
    x: 0,
    y: -1
  }];
  ncells.forEach((cell) => {
    if (getPoint(pos.x + cell.x, pos.y + cell.y) === c_empty) {
      narr.push({
        x: pos.x + cell.x,
        y: pos.y + cell.y
      });
    }
  })
  return narr;
}

function getPath(start, dest) {

  // adapted from http://www.redblobgames.com/pathfinding/a-star/introduction.html

  const costSoFar = {};
  const cameFrom = {};

  function getKey(pos) {
    return JSON.stringify([pos.x, pos.y]);
  }

  function setCost(pos, val) {
    costSoFar[getKey(pos)] = val;
  }

  function getCost(pos) {
    return costSoFar[getKey(pos)];
  }

  function setCame(pos, val) {
    cameFrom[getKey(pos)] = val;
  }

  function getSame(pos) {
    return cameFrom[getKey(pos)];
  }

  function manhattan(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
  }

  const nodeList = new pq({
    comparator: (a, b) => {
      return a.weight - b.weight;
    }
  });

  start.weight = 0;
  nodeList.queue(start);
  setCost(start, 0);
  setCame(start, undefined);

  while (nodeList.length > 0) {
    // console.log(nodeList.length);
    const current = nodeList.dequeue();

    if (current.x == dest.x && current.y === dest.y) {
      break;
    }

    getNeighbors(current).forEach((neighbor) => {
      // console.log(`Current: ${JSON.stringify(current)} N: ${JSON.stringify(neighbor)}`);
      let newCost = getCost(current) + 1;
      // console.log(` $$$ currentcost: ${getCost(current)} new cost: ${newCost}`);
      let neighborCost = getCost(neighbor);
      // console.log(`NC: ${neighborCost} for ${JSON.stringify(neighbor)}`);
      if (!neighborCost || newCost < getCost(neighbor)) {
        // console.log(` setting cost ${newCost} for ${JSON.stringify(neighbor)}`);
        setCost(neighbor, newCost)
        neighbor.weight = newCost + manhattan(neighbor, dest);
        // console.log(`  queueing ${JSON.stringify(neighbor)}`);
        nodeList.queue(neighbor);
        setCame(neighbor, current);
      }
    });
  }
console.log(costSoFar);
  if (cameFrom[getKey(dest)]) {
    const pathList = [];
    let nextNode = dest;
    while (true) {
      pathList.push(nextNode);
      nextNode = cameFrom[getKey(nextNode)];
      if (nextNode.x === start.x && nextNode.y === start.y) {
        break;
      }
    }
    return {
      path: pathList,
      length: pathList.length
    };
  }
  else {
    return undefined;
  }
}

const path = getPath(start, dest);
drawGrid();
console.log('\nPATH:', path.path.reverse().reduce((last, cur) => {
  last += ` -> (${cur.x},${cur.y})`;
  return last;
}, ''));
console.log('Distance: ', path.length);
