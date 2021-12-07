const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8");
let swarm = input.split(",").map(str => parseInt(str, 10));
// console.log(swarm);

let population = new Map();
for (const fish of swarm) {
  if (population.has(fish)) {
    population.set(fish, population.get(fish) + 1)
  } else {
    population.set(fish, 1);
  }
}
console.log("before day 1", population);


const daysTotal = 256;
let currentDay = 1;
while (currentDay <= daysTotal) {
  population = ageFish(population)
  console.log("After day", currentDay, "population is", population);
  currentDay += 1;
}

// console.log(swarm);
console.log("total population:", calcSwarmSize(population));
const endTime = new Date();

console.log(`${endTime - startTime}ms`);

function ageFish(swarm = new Map()) {
  console.log();
  console.log("ageing", swarm);
  const newSwarm = new Map();
  for (const index of [0, 1, 2, 3, 4, 5, 6, 7]) {
    // make fish one day older
    newSwarm.set(index, (swarm.get(index + 1) || 0));
  }
  newSwarm.set(8, (swarm.get(0) || 0)); // newborn
  console.log("swarm 0", swarm.get(0));
  console.log("newSwarm 0", newSwarm.get(0));
  newSwarm.set(6, (newSwarm.get(6) || 0) + (swarm.get(0) || 0)); // reset fish after parenthood
  return newSwarm;
}

function calcSwarmSize(swarm) {
  let sum = 0;
  for (const index of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
    sum += swarm.get(index);
  }
  return sum;
}
