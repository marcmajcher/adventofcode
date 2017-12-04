'use strict';

const data = require('./data');

// const data = [
//   'aba[ssbabz]xyz', // supports SSL (aba outside square brackets with corresponding bab within square brackets).
//   'xyx[xyx]xyx', // does not support SSL (xyx, but no corresponding yxy).
//   'aaa[kek]eke', // supports SSL (eke in supernet with corresponding kek in hypernet; the aaa sequence is not related, because the interior character must be different).
//   'zazbz[zbzb]cdb' // supports SSL (zaz has no corresponding aza, but zbz has a corresponding bzb, even though zaz and zbz overlap).
// ];

let count = 0;

data.forEach((ip) => {
  let out = true;
  for (let i = 0; i < ip.length - 2; i++) {
    if (ip[i] === '[') {
      out = false;
    }
    else if (ip[i] === ']') {
      out = true;
    }
    if (out) {
      let a = ip.slice(i, i + 3);
      if (a[0] === a[2] && a[0] !== a[1] && a[1] !== '[' && a[1] !== ']') {
        let b = a[1] + a[0] + a[1];
        let re = new RegExp('\\[\\w*'+b+'\\w*\\]');
        if (ip.match(re)) {
          console.log(ip);
          count++;
          break;
        }
      }
    }
  }
});

console.log(count);
