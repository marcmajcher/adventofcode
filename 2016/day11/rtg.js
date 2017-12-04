'use strict';

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
  512: 'plutonium microchip',
  1024: 'elerium generator',
  2048: 'elerium microchip',
  4096: 'dilithium generator',
  8192: 'dilithium microchip'
};
const maxId = 8192;

const startState = [
  1, // Current Floor
  15363, // Floor 1 : 11110000000011
  340, // Floor 2 : 00000101010100
  680, // Floor 3 : 00001010101000
  0 // Floor 4 : 00000000000000
];
const generatorBits = 5461; // 1 + 4 + 16 + 64 + 256
const microchipBits = 10922; // 2 + 8 + 32 + 128 + 512

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
    console.log('WOOOO!', nextState, visitedStates[nextStateKey]);
    successStateKey = nextStateKey;
    break;
  }

  getNeighborStates(nextState).forEach((neighbor) => {
    let neighborKey = stateToKey(neighbor);
    let neighborSteps = visitedStates[nextStateKey].steps + 1;

    if (stateIsValid(neighbor)) {
      if (typeof visitedStates[neighborKey] === 'undefined' ||
        visitedStates[neighborKey].steps > neighborSteps) {

        let newVal = {
          from: nextStateKey,
          steps: neighborSteps
        };

        let numShifts = (Math.log2(maxId) + 1) / 2;
        const rightShift = Math.log2(maxId) - 1;
        const mask = maxId * 2 - 1;

        function doShift(num) {
          return (num << 2 | num >>> rightShift) & mask;
        }

        while (numShifts > 0) {
          for (var i = 1; i <= 4; i++) {
            neighbor[i] = doShift(neighbor[i]);
          }
          visitedStates[stateToKey(neighbor)] = newVal;
          numShifts--;
        }

        statesToVisit.unshift(neighbor);
      }
    }
  });
}

console.log(visitedStates[successStateKey].steps);
