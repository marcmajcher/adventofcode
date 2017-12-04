const s = require('./data');

let count = 0;

for (let i = 0; i < s.length; i += 3) {
  for (let j = 0; j < 3; j++) {
    let t = [s[i][j], s[i + 1][j], s[i + 2][j]].sort((a, b) => {return a > b});
    count = t[0] + t[1] > t[2] ? count + 1 : count;
  }
}

console.log(count);
