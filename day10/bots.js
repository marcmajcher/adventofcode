const data = require('./data');

// const data = [
//   'value 5 goes to bot 2',
//   'bot 2 gives low to bot 1 and high to bot 0',
//   'value 3 goes to bot 1',
//   'bot 1 gives low to output 1 and high to bot 0',
//   'bot 0 gives low to output 2 and high to output 0',
//   'value 2 goes to bot 2'
// ];

const bots = [];
const outputs = [];

const target = [17, 61];

function nums(a, b) {
  return a - b;
}

function init() {
  data.sort().forEach((e) => {
    let [cmd, n1, ...rest] = e.split(' ');
    if (cmd === 'bot') {
      bots[n1] = {
        id: n1,
        values: [],
        [rest[1]]: [rest[3], rest[4]],
        [rest[6]]: [rest[8], rest[9]]
      };
    }
    else if (cmd === 'value') {
      bots[rest[3]].values.push(parseInt(n1));
    }
  });
  bots.forEach((b) => {
    b.values = b.values.sort(nums);
  });
}

init();

function logBots() {
  console.log('----------');
  console.log('| BOTS:');
  console.log(bots
    .filter(b => b.values.length > 0)
    .map(b => `| ${b.id}: ${b.values}`)
    .join('\n'));
  console.log('----------');
}

function give(val, type, id) {
  if (type === 'bot') {
    bots[id].values.push(val);
    bots[id].values = bots[id].values.sort(nums);
  }
  else if (type === 'output') {
    outputs[id] = val;
  }
}

let done = false;

function step() {
  const activeBots = bots.filter(b => b.values.length >= 2);
  if (activeBots.length > 0) {
    activeBots.forEach((b) => {
      const high = b.values.pop();
      const low = b.values.pop();

      if (low === target[0] && high === target[1]) {
        console.log(`*** WE GOT ONE ==> BOT ${b.id}`);
        // done = true;
      }
      console.log(`${b.id}: ${low} => ${b.low.join(' ')} ; ${high} => ${b.high.join(' ')}`);
      give(low, ...b.low);
      give(high, ...b.high);
    });
    return true;
  }
  return false;
}

logBots();
while (!done && step()) {
  logBots();
}
console.log(outputs);
console.log(outputs[0] * outputs[1] * outputs[2]);
