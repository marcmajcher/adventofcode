'use strict';

// The first floor contains a promethium generator and a promethium-compatible microchip.
// The second floor contains a cobalt generator, a curium generator, a ruthenium generator, and a plutonium generator.
// The third floor contains a cobalt-compatible microchip, a curium-compatible microchip, a
//     ruthenium-compatible microchip, and a plutonium-compatible microchip.
// The fourth floor contains nothing relevant.

const things = {
  1: 'promethium generator',
  2: 'promethium microchip',
  4: 'cobalt generator',
  8: 'cobalt microchip',
  16: 'curium generator',
  32: 'curium microchip',
  64: 'ruthenium generator',
  128: 'ruthenium microchip',
  256: 'plutonium generator',
  512: 'plutonium microchip'
}
const maxId = 512;

const state = [
  1,   // Current Floor
  3,   // Floor 1 : 0000000011
  340, // Floor 2 : 0101010100
  680, // Floor 3 : 1010101000
  0    // Floor 4 : 0000000000
];

function itemsOnFloor(floorList, floor) {
  let itemIds = []
  let data = floorList[floor];
  for (let i = 1; i <= maxId; i *= 2) {
    if (data & i) {
      itemIds.push(i)
      data -= i;
    }
  }
  return itemIds;
}

function stateToKey(floorData) {
  return floorData.join(':');
}
function keyToState(key) {
  return key.split(':');
}


function getNeighborStates(floorData) {

  return [];
}

function stateIsValid(floorData) {

  return true;
}

function describeState(floorData) {
  console.log(`You are on floor ${floorData[0]}.`);
  for (let i = 1; i < floorData.length; i++) {
    console.log(`Items on floor ${i}:`, itemsOnFloor(floorData, i).map(i=>things[i]).join(', '));
  }
}

describeState(state);
