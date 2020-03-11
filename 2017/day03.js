'use strict';

// const input = 1024;
const input = 23;
// const input = 312051;

const ring = Math.floor((Math.sqrt(input - 1) + 1) / 2);
const offset = input - (Math.pow(ring + 1, 2) + 1);


console.log(ring, offset);
