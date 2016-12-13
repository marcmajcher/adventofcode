'use strict';

// const sampleData = [
//   'aaaaa-bbb-z-y-x-123[abxyz]', // is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.
//   'a-b-c-d-e-f-g-h-987[abcde]', // is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
//   'not-a-real-room-404[oarel]', // is a real room.
//   'totally-real-room-200[decoy]' // is not.
// ]; // => 1514

const sampleData = require('./data');
let total = 0;

sampleData.forEach(addIfReal);

function addIfReal(data) {
  let [_, name, id, check] = data.match(/^([a-z\-]+)-(\d+)\[(\w+)]$/);
  let letters = name.replace(/\W/g, '').split('').reduce((obj, cur) => {
    obj[cur] = obj[cur] ? obj[cur] + 1 : 1;
    return obj;
  }, {});
  let sum = Object.keys(letters).sort()
    .sort((a, b) => {
      if (letters[a] === letters[b]) {
        return (a<b?-1:a>b);
      }
      return letters[b] - letters[a]
    })
    .join('');

  if (sum.slice(0, 5) === check) {
    total += parseInt(id);
  }
}

console.log(total);
