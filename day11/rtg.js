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
};
const maxId = 512;

const startState = [
  1, // Current Floor
  3, // Floor 1 : 0000000011
  340, // Floor 2 : 0101010100
  680, // Floor 3 : 1010101000
  0 // Floor 4 : 0000000000
];
const generatorBits = 341; // 1 + 4 + 16 + 64 + 256
const microchipBits = 682; // 2 + 8 + 32 + 128 + 512


// The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
// The second floor contains a hydrogen generator.
// The third floor contains a lithium generator.
// The fourth floor contains nothing relevant.

// const things = {
//   1: 'hydrogen generator',
//   2: 'hydrogen microchip',
//   4: 'lithium generator',
//   8: 'lithium microchip'
// };
// const maxId = 8;
// const startState = [1, 10, 1, 4, 0];
// const generatorBits = 5; // 1 + 4
// const microchipBits = 10; // 2 + 8



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
  for (let f = 0; f < possibleFloors.length; f++) {
    let newFloor = possibleFloors[f]
    for (let c = 0; c < possibleCargo.length; c++) {
      let newState = floorData.slice(0);
      newState[0] = newFloor;
      newState[floor] -= possibleCargo[c];
      newState[newFloor] += possibleCargo[c];
      states.push(newState);
    }
  }

  return states;
}

function hasGenerator(data) {
  return data & generatorBits;
}

function hasMicrochip(data) {
  return data & microchipBits;
}

function stateIsValid(floorData) {
  for (let i = 1; i < floorData.length; i++) {
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
  return floorData[4] === maxId * 2 - 1;
}

function describeState(floorData) {
  console.log(`You are on floor ${floorData[0]}.`);
  for (let i = 1; i < floorData.length; i++) {
    console.log(`Items on floor ${i}:`, itemsOnFloor(floorData, i).map(i => things[i]).join(', '));
  }
}


let visitedStates = {
  [stateToKey(startState)]: {
    steps: 0,
    from: undefined
  }
};

let statesToVisit = [startState];
let successStateKey = undefined;

while (statesToVisit.length > 0) {
  let nextState = statesToVisit.pop();
  let nextStateKey = stateToKey(nextState);

  if (stateIsSuccess(nextState)) {
    console.log('WOOOO', nextState);
    successStateKey = nextStateKey;
  //   break;
  }

  getNeighborStates(nextState).forEach((neighbor) => {
    let neighborKey = stateToKey(neighbor);
    let neighborSteps = visitedStates[nextStateKey].steps + 1;
    if (visitedStates[neighborKey] !== 'INVALID' &&
      typeof visitedStates[neighborKey] === 'undefined' ||
      visitedStates[neighborKey].steps > neighborSteps) {
      if (stateIsValid(neighbor)) {
        visitedStates[neighborKey] = {
          from: nextStateKey,
          steps: neighborSteps
        }
        statesToVisit.push(neighbor);
      }
      else {
        visitedStates[neighborKey] = 'INVALID';
      }
    }
  });
}

// console.log(visitedStates);
// let key = successStateKey;
//
// while (visitedStates[key].from) {
//     // console.log(key);
//     describeState(keyToState(key));
//     console.log();
//     key = visitedStates[key].from;
// }

console.log(visitedStates[successStateKey].steps);
// describeState(startState);
// console.log();
// getNeighborStates(startState).forEach((s) => {
//   describeState(s);
//   console.log('Valid:',stateIsValid(s));
//   console.log();
// });
