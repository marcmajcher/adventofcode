// const data = 1352;
const data = 10;

const size = 10;
const grid = [];
const start = {
  x: 1,
  y: 1
};
const dest = {
  x: 7,
  y: 4
};

function getPoint(x, y) {
  let num = x * x + 3 * x + 2 * x * y + y + y * y + data;
  let bin = num.toString(2);
  let ones = bin.split('1').length - 1;
  return (ones & 1) ? '#' : '.';
}

function fillGrid() {
  for (let y = 0; y < size; y++) {
    grid[y] = [];
    for (let x = 0; x < size; x++) {
      grid[y][x] = getPoint(x, y);
    }
  }
}

function drawGrid() {
  console.log('  0123456789');
  for (let y = 0; y < size; y++) {
    console.log(y + ' ' + grid[y].join(''));
  }
}

function getDist(start, dest) {
  return Math.abs(start.x - dest.x) + Math.abs(start.y - dest.y); // not really
}

fillGrid();
drawGrid();
console.log('\nDISTANCE:',getDist(start, dest));
