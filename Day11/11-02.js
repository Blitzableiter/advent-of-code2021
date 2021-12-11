const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8").split("\n");
let squids = input.map((line) => line.split("").map((str) => parseInt(str, 10)));
let x = 1;
let allFlashed = false;
while (!allFlashed) {
  // raise energy level of all squids by 1
  squids = squids.map((line) => line.map((squid) => squid + 1));

  // all squids > 9 flash
  let flashedThisStep = initFlashingGrid(squids);
  for (const rowIndex in squids) {
    if (Object.prototype.hasOwnProperty.call(squids, rowIndex)) {
      for (const colIndex in squids[rowIndex]) {
        if (Object.prototype.hasOwnProperty.call(squids[rowIndex], colIndex)) {
          if (squids[rowIndex][colIndex] > 9) {
            ({ squidsGrid: squids, flashedThisStepGrid: flashedThisStep } = flashSquid(rowIndex, colIndex, squids, flashedThisStep));
          }
        }
      }
    }
  }
  const currentFlashes = squids.reduce((total, row) => total + row.reduce((subTotal, squid) => subTotal + (squid ? 0 : 1), 0), 0);
  if (currentFlashes === (squids.length * squids[0].length)) {
    console.log("all squids flashed");
    allFlashed = true;
  }
  console.log("after step", x, squids);
  console.log("after step", x, allFlashed);
  x += 1;
}

function flashSquid(rowIndex = 0, colIndex = 0, squidsGrid = [[]], flashedThisStepGrid = [[]]) {
  // set current squid to 0 and mark them as flashed
  squidsGrid[rowIndex][colIndex] = 0;
  flashedThisStepGrid[rowIndex][colIndex] = true;

  // raise all neighbouring squids by 1 if they have not flashed,
  // then let them flash if they are greater than 9
  const neighbours = getNeighbours(rowIndex, colIndex, squidsGrid);
  // if (rowIndex === 8 && colIndex === 1) {
  //   console.log("neighbours", neighbours);
  // }
  for (const neighbour of neighbours) {
    if (!flashedThisStepGrid[neighbour.row][neighbour.col]) {
      squidsGrid[neighbour.row][neighbour.col] += 1;
    }
  }
  for (const neighbour of neighbours) {
    if (squidsGrid[neighbour.row][neighbour.col] > 9) {
      ({ squidsGrid, flashedThisStepGrid } = flashSquid(neighbour.row, neighbour.col, squidsGrid, flashedThisStepGrid));
    }
  }
  return { squidsGrid, flashedThisStepGrid };
}

function initFlashingGrid(refGrid = [[]]) {
  const initGrid = new Array(refGrid.length);
  for (const rowIndex in refGrid) {
    initGrid[rowIndex] = new Array(refGrid[rowIndex].length);
    for (const colIndex in refGrid) {
      initGrid[rowIndex][colIndex] = false;
    }
  }

  return initGrid;
}

function getNeighbours(centerY, centerX, grid = [[]]) {
  const directions = [
    { col: 1, row: -1 },
    { col: 1, row: 0 },
    { col: 1, row: 1 },
    { col: 0, row: 1 },
    { col: -1, row: 1 },
    { col: -1, row: 0 },
    { col: -1, row: -1 },
    { col: 0, row: -1 },
  ];
  const neighbours = [];
  for (const direction of directions) {
    const row = direction.row + parseInt(centerY, 10);
    const col = direction.col + parseInt(centerX, 10);
    if (col >= 0 && row >= 0 && row < grid.length && col < grid[row].length) {
      neighbours.push({ col, row });
    }
  }
  return neighbours;
}

const endTime = new Date();
console.log(`${endTime - startTime}ms`);
