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
const rows = 400000;

let currentRow = input;
let safeCount = countRow(input);

for (let r = 0; r < rows - 1; r++) {
  const row = '.'+currentRow+'.';
  let newRow = '';
  for (let i = 0; i < row.length - 2; i++) {
    newRow += rules[row.slice(i, i + 3)];
  }
  safeCount += countRow(newRow);
  currentRow = newRow;
}

function countRow(row) {
  return (row.match(/\./g) || []).length;
}

console.log('count', safeCount);
