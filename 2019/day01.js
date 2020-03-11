'use strict';

/* eslint-env node */

const input = require('./day01_input');
console.log(input.reduce((a, c) => a + getFuel(c), 0));

function getFuel(mass) {
  const fuelMass = Math.max(Math.floor(mass/3) - 2, 0);
  return fuelMass > 0 ? fuelMass + getFuel(fuelMass) : 0;
}