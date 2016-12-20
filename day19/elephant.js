'use strict';

const input = 3001330;

let curr = 1;
let left = [];
for (let i = 2; i <= input / 2 + 1; i++) {
  left.push(i);
}
let right = [];
for (let i = input; i > input / 2 + 1; i--) {
  right.push(i);
}

function step() {
  left.pop();
  right.unshift(curr);

  if (left.length > 0) {
    curr = left.shift();
  }
  else {
    curr = right.pop();
  }
  while (left.length < right.length) {
    left.push(right.pop());
  }

  if ((left.length + right.length)%1000 === 0) {
    console.log(left.length+right.length);
  }
}

while (left.length > 0 || right.length > 0) {
  step();
}

console.log(curr);
