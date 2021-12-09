const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8");
const topography = textTo2dArray(input);

const lowPoints = findLowPoints(topography);
console.log(lowPoints.reduce((tally, current) => tally += (current + 1), 0));


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
      if (rowIndex === 0) { // top row
        if (colIndex === 0) { // top left
          if (current < topography[rowIndex][colIndex + 1] &&
            current < topography[rowIndex + 1][colIndex]) {
            lowPoints.push(current);
          }
          continue; // to next colIndex
        }
        if (colIndex === topography[rowIndex].length - 1) { // top right
          if (current < topography[rowIndex][colIndex - 1] &&
            current < topography[rowIndex + 1][colIndex]) {
            lowPoints.push(current);
          }
          continue; // to next colIndex
        }
        // rest of top row
        if (current < topography[rowIndex][colIndex - 1] &&
          current < topography[rowIndex + 1][colIndex] &&
          current < topography[rowIndex][colIndex + 1]) {
          lowPoints.push(current);
        }
        continue; // to next colIndex
      }
      if (rowIndex === topography.length - 1) { // bottom row
        if (colIndex === 0) { // bottom left
          if (current < topography[rowIndex][colIndex + 1] &&
            current < topography[rowIndex - 1][colIndex]) {
            lowPoints.push(current);
          }
          continue; // to next colIndex
        }
        if (colIndex === topography[rowIndex].length - 1) { // bottom right
          if (current < topography[rowIndex][colIndex - 1] &&
            current < topography[rowIndex - 1][colIndex]) {
            lowPoints.push(current);
          }
          continue; // to next colIndex
        }
        // rest of bottom row
        if (current < topography[rowIndex][colIndex - 1] &&
          current < topography[rowIndex - 1][colIndex] &&
          current < topography[rowIndex][colIndex + 1]) {
          lowPoints.push(current);
        }
        continue; // to next colIndex
      }
      // rest of the rows
      if (colIndex === 0) { // first col
        if (current < topography[rowIndex - 1][colIndex] &&
          current < topography[rowIndex][colIndex + 1] &&
          current < topography[rowIndex + 1][colIndex]) {
          lowPoints.push(current);
        }
        continue;
      }
      if (colIndex === topography[rowIndex].length - 1) { // last col
        if (current < topography[rowIndex - 1][colIndex] &&
          current < topography[rowIndex][colIndex - 1] &&
          current < topography[rowIndex + 1][colIndex]) {
          lowPoints.push(current);
        }
        continue;
      }
      // rest of the cols === all inner fields
      if (current < topography[rowIndex - 1][colIndex] &&
        current < topography[rowIndex][colIndex - 1] &&
        current < topography[rowIndex + 1][colIndex] &&
        current < topography[rowIndex][colIndex + 1]) {
        lowPoints.push(current);
      }
      continue;
    }
  }
  return lowPoints;
}