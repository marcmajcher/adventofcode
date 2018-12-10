'use strict';

/* eslint-env node */

function shuffle(cards) {
  for (let i = 0; i < 100; i++) {
    const i1 = Math.floor(Math.random() * cards.length);
    const i2 = Math.floor(Math.random() * cards.length);
    [cards[i1], cards[i2]] = [cards[i2], cards[i1]];
  }
  return cards;
}

const deck = () => shuffle('A234567890JQK'.repeat(4).split(''));
const count = 10000000;

const tally = {
  pair: 0,
  ace: 0,
  face: 0,
  fail: 0,
};

let cards = deck();
for (let i = 0; i < count; i++) {
  if (cards.length === 0) {
    cards = deck();
  }

  const c1 = cards.pop();
  const c2 = cards.pop();

  if (c1 === 'J' || c1 === 'Q' || c1 === 'K' || c2 === 'J' || c2 === 'Q' || c2 === 'K') {
    tally.face++;
  }
  else if (c1 === c2) {
    tally.pair++;
  }
  else if (c1 === 'A' || c2 === 'A') {
    tally.ace++;
  }
  else {
    tally.fail++;
  }
}

console.log(tally);

console.log(`Pair: ${tally.pair / count}`);
console.log(` Ace: ${tally.ace / count}`);
console.log(` Win: ${(tally.ace + tally.pair) / count}`);
console.log(`Face: ${tally.face / count}`);
console.log(`Fail: ${tally.fail / count}`);
