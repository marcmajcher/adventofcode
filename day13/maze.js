'use strict';

const pq = require('js-priority-queue');

// const data = 1352;
const data = 10;

const c_empty = '.';
const c_wall = '#';
const c_dunno = '?';

const grid = [];
const start = {
  x: 1,
  y: 1
};
const dest = {
  x: 7,
  y: 4
};

function getPoint(x, y) {
  if (x < 0 || y < 0) {
    return c_wall;
  }

  if (x > 9 || y > 9) {
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
  let xrow = '  ';
  let drow = '--';
  for (let i = 0; i < gridSize; i++) {
    xrow += i;
    drow += '-';
  }
  console.log(xrow);
  console.log(drow);

  for (let y = 0; y < gridSize; y++) {
    if (!grid[y]) {
      grid[y] = [];
    }
    let row = y + ' ';
    for (let i = 0; i < gridSize; i++) {
      row += grid[y][i] || c_dunno;
    }
    console.log(row);
  }
}

function getNeighbors(pos) {
  let narr = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      if (getPoint(pos.x + j, pos.y + i) === c_empty) {
        narr.push({
          x: pos.x + j,
          y: pos.y + i
        });
      }
    }
  }
  return narr;
}

function getPath(start, dest) {

  // from http://www.redblobgames.com/pathfinding/a-star/introduction.html
  // frontier = PriorityQueue()
  // frontier.put(start, 0)
  // came_from = {}
  // cost_so_far = {}
  // came_from[start] = None
  // cost_so_far[start] = 0

  const costSoFar = {};
  const cameFrom = {};

  function getKey(pos) {
    return JSON.stringify([pos.x,pos.y]);
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

  // while not frontier.empty():
  while (nodeList.length > 0) {
    // console.log(nodeList.length);
    //    current = frontier.get()
    const current = nodeList.dequeue();

    //  if current == goal:
    if (current.x == dest.x && current.y === dest.y) {
      //     break
      break;
    }

    //  for next in graph.neighbors(current):
    getNeighbors(current).forEach((neighbor) => {
      // console.log(`Current: ${JSON.stringify(current)} N: ${JSON.stringify(neighbor)}`);
      //     new_cost = cost_so_far[current] + graph.cost(current, next)
      let newCost = getCost(current) + 1;
      // console.log(` $$$ currentcost: ${getCost(current)} new cost: ${newCost}`);
      //     if next not in cost_so_far or new_cost < cost_so_far[next]:
      let neighborCost = getCost(neighbor);
      // console.log(`NC: ${neighborCost} for ${JSON.stringify(neighbor)}`);
      if (!neighborCost || newCost < getCost(neighbor)) {
        //        cost_so_far[next] = new_cost
        // console.log(` setting cost ${newCost} for ${JSON.stringify(neighbor)}`);
        setCost(neighbor, newCost)
          //        priority = new_cost + heuristic(goal, next)
        neighbor.weight = newCost + manhattan(neighbor, dest);
        //        frontier.put(next, priority)
        // console.log(`  queueing ${JSON.stringify(neighbor)}`);
        nodeList.queue(neighbor);
        //        came_from[next] = current
        setCame(neighbor, current);
      }
    });
  }

  return cameFrom;

  // if (cameFrom())
  // const pathList = [];

}

const path = getPath(start, dest);
drawGrid();
console.log('\nPATH:', path);
