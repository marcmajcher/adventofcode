'use strict';

const input = '10011111011011001';
const diskSize = 272;

function getDragonData(seed, size) {
  let data = seed.toString();
  while (data.length <= size) {
    let copy = '';
    for (let i = data.length - 1; i >= 0; i--) {
      copy += data[i] === '0' ? '1' : '0';
    }
    data = `${data}0${copy}`
  }
  return data.slice(0, size);
}

function getCheckSum(str) {
  const pairSum = {
    '00': 1,
    '11': 1,
    '10': 0,
    '01': 0
  }

  let done = false;
  let cs;
  while (!done) {
    cs = '';

    while (str.length > 0) {
      cs += pairSum[str.slice(0, 2)];
      str = str.slice(2);
    }
    done = cs.length & 1;
    str = cs;
  }
  return cs;
}

const dragon = getDragonData(input, diskSize);
// console.log(dragon);
const checksum = getCheckSum(dragon);
console.log(checksum);
