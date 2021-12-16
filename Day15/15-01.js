const fs = require("fs");

const startTime = new Date();

let map = fs.readFileSync("./input.txt", "utf8")
  .split("\n")
  .map(line => line
    .split("")
    .map(strVal => ({ distanceToNode: parseInt(strVal, 10), cumulatedDistance: Infinity, visited: false })));
const yMax = map.length;
const xMax = map[0].length;

map[0][0].cumulatedDistance = 0;

let current = { x: 0, y: 0 };
const destination = { y: map.length - 1, x: map[0].length - 1 };
let pathToDestination = Infinity;


let i = 0;
// while(map[yMax][xMax].cumulatedDistance === Infinity) {
while (pathToDestination === Infinity) {
  map = evaluateUnvisitedNeighbours({ x: current.x, y: current.y }, map)
  map[current.y][current.x].visited = true;
  if (map[destination.y][destination.x].visited) {
    pathToDestination = map[destination.y][destination.x].cumulatedDistance;
    break;
  }
  current = findNearestUnvisited(map);

  // console.log(map);
  i += 1;
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



const endTime = new Date();
console.log(`${endTime - startTime}ms`);
