'use strict';

// const input = require('data09');

const input = [
  'London to Dublin = 464',
  'London to Belfast = 518',
  'Dublin to Belfast = 141'
];
// London -> Dublin -> Belfast = 605

const routes = {};

input.forEach(route => {
  const [from, _to, to, _eq, distance] = route.split(' ');
  if (!routes[from]) {
    routes[from] = {};
  }
  routes[from][to] = parseInt(distance);
});


console.log(routes);
