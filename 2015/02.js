'use strict';

const input = require('./data02.js');

let paper = 0;
let ribbon = 0;

input.forEach(box => {
  let [l, w, h] = box.split('x').sort((a,b) => a-b).map(e=>parseInt(e));
  let area = 2*l*w + 2*w*h + 2*h*l + l*w;
  paper += area;

  let perimeter = 2*(l+w);
  let bow = l*w*h;
  ribbon += perimeter + bow;
})

// console.log(paper);
console.log(ribbon);
