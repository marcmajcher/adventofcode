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
  1, // Current Floor
  3, // Floor 1 : 0000000011
  340, // Floor 2 : 0101010100
  680, // Floor 3 : 1010101000
  0 // Floor 4 : 0000000000
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
  const floor = floorData[0];
  const items = itemsOnFloor(floorData, floor);

  const possibleFloors = (floor === 1 ? [2] : floor === 4 ? [3] : [floor - 1, floor + 1]);

  let possibleCargo = [];
  for (let i = 0; i < items.length; i++) {
    possibleCargo.push(items[i]);
    for (let j = i + 1; j < items.length; j++) {
      possibleCargo.push(items[i] + items[j]);
    }
  }

  let states = [];
  for (let f=0; f<possibleFloors.length; f++) {
    let newFloor = possibleFloors[f]
    for (let c=0; c<possibleCargo.length; c++) {
      let newState = floorData.slice(0);
      newState[0] = newFloor;
      newState[floor] -= possibleCargo[c];
      newState[newFloor] += possibleCargo[c];
      states.push(newState);
    }
  }

  return states;
}

const generatorBits = [1, 4, 16, 64, 256];
const microchipBits = [2, 8, 32, 128, 512];

function hasGenerator(data) {
  return data & 341;
}

function hasMicrochip(data) {
  return data & 682;
}

function stateIsValid(floorData) {
  for (let i = 1; i < floorData.length; i++) {
    console.log('checking', i);
    let data = floorData[i];
    if (hasGenerator(data) && hasMicrochip(data)) {
      for (let i = 1; i <= maxId; i *= 4) {
        if (((i * 2) & data) && (!(i & data))) { // has chip without matching generator
          return false;
        }
      }
    }
  }
  return true;
}

function stateIsSuccess(floorData) {
  return floorData[4] === 1023;
}

function describeState(floorData) {
  console.log(`You are on floor ${floorData[0]}.`);
  for (let i = 1; i < floorData.length; i++) {
    console.log(`Items on floor ${i}:`, itemsOnFloor(floorData, i).map(i => things[i]).join(', '));
  }
}

describeState(state);
console.log();
getNeighborStates(state).forEach((s) => {
  describeState(s);
  console.log('Valid:',stateIsValid(s));
  console.log();
});
