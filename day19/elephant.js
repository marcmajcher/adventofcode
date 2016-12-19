'use strict';

const input = 3001330;

let elves = Array(input).fill(1);

const d1 = new Date();
let taker = -1;

while (elves.indexOf(1, elves.indexOf(1) + 1) !== -1) {
  for (let i = 0; i < elves.length; i++) {
    if (elves[i] === 1) {
      if (taker < 0) { // you're the new taker!
        taker = i;
      }
      else {
        // console.log(`Elf ${taker} taking from elf ${i}`);
        elves[taker] = 1;
        elves[i] = 0;
        taker = -1;
      }
    }
  }
  // console.log(elves);
}

const d2 = new Date();
// console.log(elves);
console.log(elves.indexOf(1) + 1);

console.log('time: ', d2 - d1);
