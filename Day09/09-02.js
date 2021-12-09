const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8");
const topography = textTo2dArray(input);

const lowPoints = findLowPoints(topography);
const basinSizes = []
for (const point of lowPoints) {
  basinSizes.push(sizeOfBasinAroundLowpoint(point.rowIndex, point.colIndex, topography));
}
basinSizes.sort((a, b) => b - a);
const [first, second, third] = basinSizes;
console.log(first * second * third);


const endTime = new Date();
console.log(`${endTime - startTime}ms`);

function textTo2dArray(text = "") {
  return text.split("\n").map(line => line.split("").map(str => parseInt(str, 10)))
}

function findLowPoints(topography = [[]]) {
  const lowPoints = [];
  for (let rowIndex in topography) {
    rowIndex = parseInt(rowIndex, 10);
    for (let colIndex in topography[rowIndex]) {
      colIndex = parseInt(colIndex, 10);
      const current = topography[rowIndex][colIndex];
      const neighbours = getNeighbours(rowIndex, colIndex, topography);

      const isLowest = neighbours.reduce((isLowest, currentNeighbour) => {
        if (topography[currentNeighbour.rowIndex][currentNeighbour.colIndex] < current) return (isLowest && false);
        return (isLowest && true);
      }, true);


      if (isLowest)
        lowPoints.push({ rowIndex, colIndex });
    }
  }
  return lowPoints;
}

function sizeOfBasinAroundLowpoint(rowIndex, colIndex, topography) {
  const checkedTopography = new Array(topography.length);
  for (const rowIndex in topography) {
    checkedTopography[rowIndex] = new Array(topography[rowIndex].length)
    for (const colIndex in topography) {
      checkedTopography[rowIndex][colIndex] = false;
    }
  }

  const toVisit = [{ rowIndex, colIndex }];
  const inBasin = [];
  checkedTopography[rowIndex][colIndex] = true;

  while (toVisit.length) {
    const current = toVisit.pop();
    inBasin.push(current);

    const neighbours = getNeighbours(current.rowIndex, current.colIndex, topography);
    for (const neighbour of neighbours) {
      if (!checkedTopography[neighbour.rowIndex][neighbour.colIndex] &&
        topography[neighbour.rowIndex][neighbour.colIndex] !== 9) {
        checkedTopography[neighbour.rowIndex][neighbour.colIndex] = true;
        toVisit.push({ rowIndex: neighbour.rowIndex, colIndex: neighbour.colIndex });
      }
    }
  }
  // no more fields to visit
  return inBasin.length;
}

function getNeighbours(rowIndex, colIndex, topography) {
  const directions = [
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: -1, col: 0 }
  ];
  const neighbours = [];

  for (const direction of directions) {
    const row = direction.row + rowIndex;
    const col = direction.col + colIndex;
    if (row >= 0 &&
      col >= 0 &&
      row <= topography.length - 1 &&
      col <= topography[rowIndex].length - 1) {
      neighbours.push({ rowIndex: row, colIndex: col });
    }
  }
  return neighbours;
}