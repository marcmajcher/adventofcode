'use strict';

// const input = require('./data');
// const password = 'abcdefgh';

const password = 'abcde'; // => decab
const input = [
  'swap position 4 with position 0', // swaps the first and last letters, producing the input for the next step, ebcda.
  'swap letter d with letter b', // swaps the positions of d and b: edcba.
  'reverse positions 0 through 4', // causes the entire string to be reversed, producing abcde.
  'rotate left 1 step', // shifts all letters left one position, causing the first letter to wrap to the end of the string: bcdea.
  'move position 1 to position 4', // removes the letter at position 1 (c), then inserts it at position 4 (the end of the string): bdeac.
  'move position 3 to position 0', // removes the letter at position 3 (a), then inserts it at position 0 (the front of the string): abdec.
  'rotate based on position of letter b', // finds the index of letter b (1), then rotates the string right once plus a number of times equal to that index (2): ecabd.
  'rotate based on position of letter d' // finds the index of letter d (4), then rotates the string right once, plus a number of times equal to that index, plus an additional time because the index was at least 4, for a total of 6 right rotations: decab.
];

const instructions = {
  swap: (pass, args) => {
    const what = args.shift();
    if (what === 'position') {
      // swap position X with position Y means that the letters at indexes X and Y (counting from 0) should be swapped.
      const [x, _w, _p, y] = args;
      console.log(`SWAP positions ${x} <=> ${y}`);
      console.log(' IN:',pass.join(''));
    }
    else if (what === 'letter') {
      // swap letter X with letter Y means that the letters X and Y should be swapped (regardless of where they appear in the string).
      const [x, _w, _l, y] = args;
      console.log(`SWAP letters ${x} <=> ${y}`);
      console.log(' IN:',pass.join(''));
    }
  },
  rotate: (pass, args) => {
    const what = args.shift();
    // rotate left/right X steps means that the whole string should be rotated; for example, one right rotation would turn abcd into dabc.
    if (what === 'left' || what === 'right') {
      const steps = args[0];
      console.log(`ROTATE ${what} ${steps} steps`);
      console.log(' IN:',pass.join(''));
    }
    // rotate based on position of letter X means that the whole string should be rotated to the right based on the index of letter X (counting from 0) as determined before this instruction does any rotations. Once the index is determined, rotate the string to the right one time, plus a number of times equal to that index, plus one additional time if the index was at least 4.
    else if (what === 'based') {
      const letter = args[4];
      console.log(`ROTATE based on letter ${letter}`);
      console.log(' IN:',pass.join(''));
    }
  },
  reverse: (pass, args) => {
    // reverse positions X through Y means that the span of letters at indexes X through Y (including the letters at X and Y) should be reversed in order.
    const [_p, from, _t, to] = args;
    console.log(`REVERSE ${from} - ${to}`);
    console.log(' IN:',pass.join(''));
  },
  move: (pass, args) => {
    // move position X to position Y means that the letter which is at index X should be removed from the string, then inserted such that it ends up at index Y.
    const [_p, from, _t, _ppm, to] = args;
    console.log(`MOVE ${from} => ${to}`);
    console.log(' IN:',pass.join(''));
  },
};

const pass = password.split('');
input.forEach(inst => {
  const parts = inst.split(' ');
  const instruction = parts.shift();
  instructions[instruction](pass, parts);
});
