'use strict';

const sampleData = 'L4, L1, R4, R1, R1, L3, R5, L5, L2, L3, R2, R1, L4, R5, R4, L2, R1, R3, L5, R1, L3, L2, R5, L4, L5, R1, R2, L1, R5, L3, R2, R2, L1, R5, R2, L1, L1, R2, L1, R1, L2, L2, R4, R3, R2, L3, L188, L3, R2, R54, R1, R1, L2, L4, L3, L2, R3, L1, L1, R3, R5, L1, R5, L1, L1, R2, R4, R4, L5, L4, L1, R2, R4, R5, L2, L3, R5, L5, R1, R5, L2, R4, L2, L1, R4, R3, R4, L4, R3, L4, R78, R2, L3, R188, R2, R3, L2, R2, R3, R1, R5, R1, L1, L1, R4, R2, R1, R5, L1, R4, L4, R2, R5, L2, L5, R4, L3, L2, R1, R1, L5, L4, R1, L5, L1, L5, L1, L4, L3, L5, R4, R5, R2, L5, R5, R5, R4, R2, L1, L2, R3, R5, R5, R5, L2, L1, R4, R3, R1, L4, L2, L3, R2, L3, L5, L2, L2, L1, L2, R5, L2, L2, L3, L1, R1, L4, R2, L4, R3, R5, R3, R4, R1, R5, L3, L5, L5, L3, L2, L1, R3, L4, R3, R2, L1, R3, R1, L2, R4, L3, L3, L3, L1, L2';

const wnes = [{
  x: -1,
  y: 0
}, {
  x: 0,
  y: 1
}, {
  x: 1,
  y: 0
}, {
  x: 0,
  y: -1
}];

let location = {
  x: 0,
  y: 0
};
let direction = 1; // start facing north

let visited = {};

function step(inst) {
  const dir = inst.slice(0, 1);
  const dist = parseInt(inst.slice(1));

  direction = (dir === 'L' ? direction - 1 : direction + 1) % 4;
  if (direction < 0) {
    direction += 4;
  }

  for (let i = 0; i < dist; i++) {
    if (wnes[direction].x === 0) {
      location.y += wnes[direction].y;
    }
    else {
      location.x += wnes[direction].x;
    }
    checkKey();
  }
}

function checkKey() {
  let key = JSON.stringify(location);
  if (visited[key]) {
    console.log(Math.abs(location.x) + Math.abs(location.y));
    process.exit();
  }
  visited[key] = 1;
}

sampleData.split(', ').forEach(step);
