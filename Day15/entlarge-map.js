const fs = require("fs");

let cave = fs.readFileSync("./input.txt", "utf8")
  .split("\n")
  .map(line => line
    .split("")
    .map(strVal => ({ distanceToNode: parseInt(strVal, 10), cumulatedDistance: Infinity, visited: false })));
// .map(strVal => parseInt(strVal, 10)));
cave = enlargeMap(cave, 5);

console.log(cave[0][0]);

function enlargeMap(oldMap, factor) {

  const newMap = [];
  for (let rowIndex = 0; rowIndex < oldMap.length * factor; rowIndex++) {
    newMap.push([]); // create row
    for (let colIndex = 0; colIndex < oldMap[0].length * factor; colIndex++) {
      if (rowIndex < oldMap.length && colIndex < oldMap[rowIndex].length) {
        newMap[rowIndex].push({ ...oldMap[rowIndex][colIndex] });
      } else if (rowIndex > (oldMap.length - 1)) {
        const oldNode = { ...newMap[rowIndex - oldMap.length][colIndex] };
        const newDistanceValue = oldNode.distanceToNode === 9 ? 1 : oldNode.distanceToNode + 1;
        newMap[rowIndex][colIndex] = { ...oldNode, distanceToNode: newDistanceValue };
      } else {
        const oldNode = { ...newMap[rowIndex][colIndex - oldMap.length] };
        const newDistanceValue = oldNode.distanceToNode === 9 ? 1 : oldNode.distanceToNode + 1;
        newMap[rowIndex][colIndex] = { ...oldNode, distanceToNode: newDistanceValue };
      }
    }
  }

  return newMap;
}