'use strict';

const input = require('./data09');

// const input = [
//   'London to Dublin = 464',
//   'London to Belfast = 518',
//   'Dublin to Belfast = 141'
// ];
// London -> Dublin -> Belfast = 605

const routes = {};

input.forEach(route => {
  const [from, _to, to, _eq, distance] = route.split(' ');
  routes[from] = routes[from] ? routes[from] : {};
  routes[to] = routes[to] ? routes[to] : {};
  routes[from][to] = parseInt(distance);
  routes[to][from] = parseInt(distance);
});
Object.freeze(routes);

function findShortestRoute(routes) {
  let minDistance = Number.MAX_SAFE_INTEGER;

  Object.keys(routes).forEach(city => {
    const distance = getRoute(routes, city, {}, 0, minDistance);
    minDistance = Math.min(distance, minDistance);
  });

  return minDistance;
}

function getRoute(routes, start, seen, distanceSoFar, minSoFar) {
  seen[start] = true;
  const toVisit = Object.keys(routes[start]).filter(key => !seen[key]);
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


console.log(routes);
console.log(findShortestRoute(routes));
// not 322 - too high
