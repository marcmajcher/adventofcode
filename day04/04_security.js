'use strict';

const sampleData = require('./data');

sampleData.forEach(printIfReal);

function printIfReal(data) {
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
    console.log(decrypt(name, id), id);
  }
}

function decrypt(name, id) {
  id = id%26;
  return name.split('').map((e) => {
    if (e === '-') { return ' '}
    return String.fromCharCode(( ( e.charCodeAt(0) - 97) + id)%26 + 97);
  }).join('');
}

// console.log(decrypt('qzmt-zixmtkozy-ivhz',343));
