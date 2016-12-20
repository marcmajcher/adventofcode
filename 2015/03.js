'use strict';

const input = require('./data03');

const houses = {'0:0': 1};

const loc = [0,0];
const rloc = [0,0];
const dirs = {
  '>': [1,0],
  'v': [0,-1],
  '<': [-1,0],
  '^': [0,1]
}
for (let i = 0; i < input.length; i++) {
  const dir = dirs[input[i]];
  loc[0] += dir[0];
  loc[1] += dir[1];
  const key = loc.join(':');
  houses[key] = key in houses?houses[key]+1:1;

i++;
  const rdir = dirs[input[i]];
  rloc[0] += rdir[0];
  rloc[1] += rdir[1];
  const rkey = rloc.join(':');
  houses[rkey] = rkey in houses?houses[rkey]+1:1;

}

console.log(Object.keys(houses).length);
