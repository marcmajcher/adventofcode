'use strict';

const pq = require('js-priority-queue');

const input = require('./data.js'); // <712
// const input = `
// ###########
// #0.1.....2#
// #.#######.#
// #4.......3#
// ###########
// `; // 14 steps

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
  return getRoute(routes, 0, new Set(), 0, {
    min: Number.MAX_SAFE_INTEGER
  }, []);
}

let goHome = false;

function getRoute(routes, start, seen, distanceSoFar, minSoFar, pathSoFar) {
  pathSoFar.push(start);
  seen.add(start);

  let toVisit = [];
  for (var i = 0; i < routes.length; i++) {
    if (!seen.has(i)) {
      toVisit.push(i);
    }
  }
  toVisit = toVisit.reverse();

  // console.log(start, toVisit, distanceSoFar, `(${minSoFar.min})`, pathSoFar);

  if (toVisit.length > 0) {
    for (let i = 0; i < toVisit.length; i++) {
      const next = toVisit[i];
      const newDistance = distanceSoFar + routes[start][next];
      if (newDistance > minSoFar.min) {
        // console.log(toVisit[i], 'NO GOOD');
        return minSoFar.min;
      }
      // console.log('getting route for', i);
      const routeDistance = getRoute(routes, toVisit[i], new Set(seen), newDistance, minSoFar, pathSoFar.slice(0));
      // return Math.min(routeDistance, minSoFar.min);
    };
  }
  else {
    // console.log('FULL ROUTE LENGTH:', distanceSoFar, start);
    const newDist = distanceSoFar + routes[start][0];
    if (newDist < minSoFar.min) {
      minSoFar.min = newDist;
    }
    return minSoFar.min;
  }

  return minSoFar.min;

}

console.log(findShortestRoute(distances));
