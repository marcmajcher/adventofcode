'use strict';

const pq = require('js-priority-queue');

const input = require('./data.js');
// const input = `
// ###########
// #0.1.....2#
// #.#######.#
// #4.......3#
// ###########
// `; // 14 steps

// strategy two: get all the checkpoints, get the distances between each pair of checkpoints, do TSP

const wall = '#';
const ducts = input.split('\n').filter(e => e !== '');
// const numberOfCheckpoints = input.match(/\d/g).length;
// console.log(numberOfCheckpoints);

const checkpoints = [];
for (let x = 0; x < ducts[0].length; x++) {
  for (let y = 0; y < ducts.length; y++) {
    if (ducts[y][x].match(/\d/)) {
      checkpoints.push({
        x,
        y
      });
    }
  }
}
// console.log(checkpoints);

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

function getContents(loc) {
  return ducts[loc.y][loc.x];
}

function shortestPathLength(pointA, pointB) {
  const costSoFar = {};

  pointA.weight = 0;
  pointB.weight = 0;
  setCost(pointA, 0);

  function getKey(pos) {
    return JSON.stringify([pos.x, pos.y]);
  }

  function setCost(pos, val) {
    costSoFar[getKey(pos)] = val;
  }

  function getCost(pos) {
    return costSoFar[getKey(pos)];
  }

  function manhattan(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
  }

  const nodeList = new pq({
    comparator: (a, b) => {
      return a.weight - b.weight;
    }
  });
  nodeList.queue(pointA);

  while (nodeList.length > 0) {
    const current = nodeList.dequeue();

    if (current.x == pointB.x && current.y === pointB.y) {
      return getCost(current);
    }

    getNeighbors(current).forEach((neighbor) => {
      let nextCost = getCost(current) + 1;
      let neighborCost = getCost(neighbor);
      if (typeof neighborCost === 'undefined' || nextCost < getCost(neighbor)) {
        setCost(neighbor, nextCost)
        neighbor.weight = nextCost + manhattan(neighbor, pointB);
        nodeList.queue(neighbor);
      }
    });
  }
}

// STEP 1: build distance table for all checkpoint pairs
const distances = [];
for (let i = 0; i < checkpoints.length; i++) {
  distances[i] = [];
  for (let j = 0; j < checkpoints.length; j++) {
    distances[i][j] = shortestPathLength(checkpoints[i], checkpoints[j]);
  }
}
console.log(distances);

// STEP 2: find shortest route that hits all the points

function findShortestRoute(routes) {
  let minDistance = Number.MAX_SAFE_INTEGER;

  routes.forEach(start => {
    const distance = getRoute(routes, start, {}, 0, minDistance);
    minDistance = Math.min(distance, minDistance);
  });

  return minDistance;
}

function getRoute(routes, start, seen, distanceSoFar, minSoFar) {
  seen[start] = true;
  const toVisit = routes[start].filter(key => !seen[key]);
  if (toVisit.length > 0) {
    for (let i = 0; i < toVisit.length; i++) {
      distanceSoFar += routes[start][toVisit[i]];

      if (distanceSoFar > minSoFar) {
        return Number.MAX_SAFE_INTEGER;
      }
      return getRoute(routes, toVisit[i], seen, distanceSoFar, minSoFar);
    }

  }
  else {
    return distanceSoFar;
  }

}

console.log(findShortestRoute(distances));

// const visited = {};
// const start = {
//   x: 1,
//   y: 1,
//   steps: 0,
//   numbers: ''
// };
// const toVisit = [start];
//
// function toKey(loc) {
//   return [loc.numbers, loc.x, loc.y].join(':');
// }
//

// while (toVisit.length > 0) {
//   const location = toVisit.pop();
//   // console.log(location);
//
//   if (getContents(location).match(/\d/)) {
//     const numbersSeen = new Set(location.numbers.split(''));
//     numbersSeen.add(getContents(location));
//     location.numbers = [...numbersSeen].sort((a, b) => a - b).join('');
//   }
//
//   if (location.numbers.length === numberOfCheckpoints) {
//     console.log('WOOOOOO');
//     console.log(location);
//     break;
//   }
//
//   const key = toKey(location);
//   if (visited[key] === undefined || visited[key].steps > location.steps) {
//     visited[key] = location;
//   }
//
//   getNeighbors(location).forEach(loc => {
//     if (loc.steps === undefined) {
//       loc.steps = location.steps + 1;
//     }
//     if (loc.numbers === undefined) {
//       loc.numbers = location.numbers;
//     }
//     toVisit.unshift(loc);
//   })
//
// }
