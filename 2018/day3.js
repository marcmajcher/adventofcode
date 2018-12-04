'use strict';

/* eslint-env node */

// const input = [
//   '#1 @ 1,3: 4x4',
//   '#2 @ 3,1: 4x4',
//   '#3 @ 5,5: 2x2',
// ];
const input = require('./day3_input');
const claims = input.map(e => {
  const [id, left, top, w, h] = getClaim(e);
  return {
    id,
    left,
    top,
    w,
    h
  };
})

function getClaim(str) {
  return str.match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/).map(e => parseInt(e, 10)).slice(1);
}

const overlaps = {};

for (let c1 = 0; c1 < claims.length; c1++) {
  overlaps[claims[c1].id] = 0;
  for (let c2 = 0; c2 < claims.length; c2++) {
    if (c1 !== c2) {
      if (!(claims[c1].left + claims[c1].w <= claims[c2].left ||
        claims[c1].top + claims[c1].h <= claims[c2].top ||
        claims[c2].left + claims[c2].w <= claims[c1].left ||
        claims[c2].top + claims[c2].h <= claims[c1].top)) {
          overlaps[claims[c1].id]++;
      }
    }
  }
}

console.log(Object.entries(overlaps).filter(e => e[1] === 0)[0][0])

////// pt1

// const fabric = [];

// claims.forEach((claim) => {
//   const [id, left, top, w, h] = getClaim(claim);
//   for (let x = left; x < left + w; x++) {
//     if (!fabric[x]) {
//       fabric[x] = [];
//     }
//     for (let y = top; y < top + h; y++) {
//       if (fabric[x][y] === undefined) {
//         fabric[x][y] = [];
//       }
//       fabric[x][y]++;
//     }
//   }
// });

// let count=0;
// fabric.forEach(e => {
//   if (e) {
//     e.forEach(f => {
//       if (f>1) {count++}
//     })
//   }
// });
// console.log(count);
