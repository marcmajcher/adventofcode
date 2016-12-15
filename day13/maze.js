'use strict';

const pq = require('js-priority-queue');

// const data = 1352;
const data = 10;

const size = 10;
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
  let num = x * x + 3 * x + 2 * x * y + y + y * y + data;
  let bin = num.toString(2);
  let ones = bin.split('1').length - 1;
  return (ones & 1) ? '#' : '.';
}

function fillGrid() {
  for (let y = 0; y < size; y++) {
    grid[y] = [];
    for (let x = 0; x < size; x++) {
      grid[y][x] = getPoint(x, y);
    }
  }
}

function drawGrid() {
  console.log('  0123456789');
  for (let y = 0; y < size; y++) {
    console.log(y + ' ' + grid[y].join(''));
  }
}

function getDist(start, dest) {
  return Math.abs(start.x - dest.x) + Math.abs(start.y - dest.y); // not really

  // from http://www.redblobgames.com/pathfinding/a-star/introduction.html
  // frontier = PriorityQueue()
  // frontier.put(start, 0)
  // came_from = {}
  // cost_so_far = {}
  // came_from[start] = None
  // cost_so_far[start] = 0

  const list = new pq();
  list.queue(start);
  const cameFrom = {
    [JSON.stringify(start)]: undefined
  };
  const costSoFar = {
    [JSON.stringify(start)]: 0
  };

  // while not frontier.empty():
  //    current = frontier.get()

  while (list.length > 0) {
    const current = list.dequeue();
    if (current.x == dest.x && current.y === dest.y) {
      break;
    }
    //  if current == goal:
    //     break

    //  for next in graph.neighbors(current):
    //     new_cost = cost_so_far[current] + graph.cost(current, next)
    //     if next not in cost_so_far or new_cost < cost_so_far[next]:
    //        cost_so_far[next] = new_cost
    //        priority = new_cost + heuristic(goal, next)
    //        frontier.put(next, priority)
    //        came_from[next] = current
  }
}

fillGrid();
drawGrid();
console.log('\nDISTANCE:', getDist(start, dest));
