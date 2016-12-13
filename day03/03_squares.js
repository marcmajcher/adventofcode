const sampleData = require('./data');


console.log(sampleData.reduce(isValid, 0));

function isValid(last, cur) {
  triangle = cur.sort((a, b) => { return a > b });
  return (triangle[0] + triangle[1] > triangle[2] ? last + 1 : last);
}
