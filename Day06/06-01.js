const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8");
let swarm = input.split(",").map(str => parseInt(str, 10));
console.log(swarm);

const daysTotal = 256;
let currentDay = 1;
while (currentDay <= daysTotal) {
  swarm = ageFish(swarm)
  console.log("After day", currentDay, "there are", swarm.length, "fish");
  currentDay += 1;
}

// console.log(swarm);
console.log(swarm.length);
const endTime = new Date();

console.log(`${endTime - startTime}ms`);

function ageFish(swarm = []) {
  const newSwarm = [];
  for (let fish of swarm) {
    if (fish === 0) {
      newSwarm.push(8);
      newSwarm.push(6)
      continue;
    }
    fish -= 1;
    newSwarm.push(fish)
  }
  return newSwarm;
}