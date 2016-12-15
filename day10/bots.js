// let data = require('./data');

let data = [
  'value 5 goes to bot 2',
  'bot 2 gives low to bot 1 and high to bot 0',
  'value 3 goes to bot 1',
  'bot 1 gives low to output 1 and high to bot 0',
  'bot 0 gives low to output 2 and high to output 0',
  'value 2 goes to bot 2'
];

const bots = [];
const outputs = [];

function init() {
  data.sort().forEach((e) => {
    let [cmd, n1, ...rest] = e.split(' ');
    if (cmd === 'bot') {
      bots[n1] = {
        id: n1,
        values: [],
        [rest[1]]: [rest[3],rest[4]],
        [rest[6]]: [rest[8],rest[9]]
      };
    }
    else if (cmd === 'value') {
      bots[rest[3]].values.push(n1);
    }
  })
}

init();
console.log(bots);
