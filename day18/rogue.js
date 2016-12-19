'use strict';

const input = '.^^^^^.^^^..^^^^^...^.^..^^^.^^....^.^...^^^...^^^^..^...^...^^.^.^.......^..^^...^.^.^^..^^^^^...^.';

// const rules = ['001', '011', '100', '110']; // => 01011010
const rules = {
  '...': '.',
  '..^': '^',
  '.^.': '.',
  '.^^': '^',
  '^..': '^',
  '^.^': '.',
  '^^.': '^',
  '^^^': '.'
};
const rows = 40;

const room = [input];

for (let r=0; r<rows-1; r++) {
  const row = `.${room[r]}.`;
  let newRow = '';
  for (let i=0; i<row.length-2; i++) {
    newRow += rules[row.slice(i,i+3)];
    // console.log(row.slice(i,3));
  }
  room.push(newRow);
}

const match = room.join('').match(/\./g) || [];
console.log(match.length);
