'use strict';

const discs = [{
  size: 17,
  pos: 15
}, {
  size: 3,
  pos: 2
}, {
  size: 19,
  pos: 4
}, {
  size: 13,
  pos: 2
}, {
  size: 7,
  pos: 2
}, {
  size: 5,
  pos: 0
}, {
  size: 11,
  pos: 0
}];

// const discs = [
//   {size: 5, pos: 4},
//   {size: 2, pos: 1}
// ];

let time = -1;
let ok = false;

while (!ok) {
  time++;
  ok = true;

  // console.log('Time', time);
  for (let i = 0; i < discs.length; i++) {
    const sec = i + 1;
    const pos = (discs[i].pos + sec + time) % discs[i].size;
    // console.log('  sec',sec,': disc',i,'at',pos);
    if (pos !== 0) {
      ok = false;
      break;
    }
  }
}
console.log(time);
