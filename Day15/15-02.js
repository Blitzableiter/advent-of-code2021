const fs = require("fs");

const startTime = new Date();

let map = fs.readFileSync("./input.txt", "utf8")
  .split("\n")
  .map(line => line
    .split("")
    .map(strVal => ({ distanceToNode: parseInt(strVal, 10), cumulatedDistance: Infinity, visited: false })));
map = enlargeMap(map, 5);
console.log(map[0][0]);
const yMax = map.length;
const xMax = map[0].length;

map[0][0].cumulatedDistance = 0;

let current = { x: 0, y: 0 };
const destination = { y: map.length - 1, x: map[0].length - 1 };
let pathToDestination = Infinity;

console.log(destination);

while (pathToDestination === Infinity) {
  if (current.x === current.y) {
    console.log(current);
  }
  map = evaluateUnvisitedNeighbours({ x: current.x, y: current.y }, map)
  map[current.y][current.x].visited = true;
  if (map[destination.y][destination.x].visited) {
    pathToDestination = map[destination.y][destination.x].cumulatedDistance;
    break;
  }
  current = findNearestUnvisited(map);
}
console.log(pathToDestination);

function evaluateUnvisitedNeighbours(current = {}, grid = [[]]) {
  const directions = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 }
  ]

  const neighbours = [];
  for (const direction of directions) {
    const y = parseInt(direction.y, 10) + parseInt(current.y, 10);
    const x = parseInt(direction.x, 10) + parseInt(current.x, 10);
    if (x >= 0 && y >= 0 && y < grid.length && x < grid[y].length && !grid[y][x].visited) {
      neighbours.push({ x, y });
    }
  }

  const currentCumulatedDistance = grid[current.y][current.x].cumulatedDistance;
  for (const neighbour of neighbours) {
    const { x, y } = neighbour;
    // console.log("neighbour", grid[y][x], x, y);
    const cumulatedDistance = currentCumulatedDistance + grid[y][x].distanceToNode;
    if (grid[y][x].cumulatedDistance > cumulatedDistance) {
      grid[y][x].cumulatedDistance = cumulatedDistance;
    }
  }

  return grid;
}

function findNearestUnvisited(grid = [[]]) {
  let nearestUnvisited = Infinity;
  let nearest = {}
  for (const row in grid) {
    for (const col in grid[row]) {
      if (!grid[row][col].visited && grid[row][col].cumulatedDistance < nearestUnvisited) {
        // console.log("not visited and cumul distance", grid[row][col], col, row);
        nearestUnvisited = grid[row][col].cumulatedDistance;
        nearest.x = col;
        nearest.y = row;
      }
    }
  }
  // console.log(nearest);
  return nearest;
}

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



const endTime = new Date();
console.log(`${endTime - startTime}ms`);
