'use strict';

/* eslint-env node */

const input = require('./day5_input');
// const input = 'dabAcCaCBAcCcaDA';

function react(str) {
  let match = true;
  let tmparr;
  let working = str;

  while (match) {
    match = false;
    tmparr = [];
    for (let i = 0; i < working.length; i++) {
      if (working.charCodeAt(i) === working.charCodeAt(i + 1) + 32 ||
        working.charCodeAt(i) === working.charCodeAt(i + 1) - 32) {
        match = true;
        i++;
      }
      else {
        tmparr.push(working[i]);
      }
    }
    working = tmparr.join('');
  }

  return working.length;
}

const reactions = [];
'abcdefghijklmnopqrstuvwxyz'.split('').forEach((e) => {
  reactions.push({ letter: e, length: react(input.replace(new RegExp(e, 'gi'), '')) });
});

console.log(reactions.reduce((a, c) => (c.length < a.length ? c : a), { length: Number.MAX_SAFE_INTEGER }));
