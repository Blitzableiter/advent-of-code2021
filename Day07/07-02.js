const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8");

const crabs = input.split(",").map(str => parseInt(str, 10));
const average1 = Math.floor(crabs.reduce((total, current) => total + current, 0) / crabs.length);
const average2 = Math.ceil(crabs.reduce((total, current) => total + current, 0) / crabs.length);
console.log(average1);
console.log(average2);

const fuel1 = calculateFuel(crabs, average1);
const fuel2 = calculateFuel(crabs, average2);

function calculateFuel(crabs, average) {
  return crabs.reduce((total, current) => {
    let [a, b] = [current, average].sort((a, b) => a - b);
    let pointer = a;
    let toAdd = 1;
    while (a < b) {
      total += toAdd;
      toAdd += 1;
      a += 1;
    }
    return total;
  }, 0);
}

console.log([fuel1, fuel2].sort((a, b) => a - b)[0]);

const endTime = new Date();

console.log(`${endTime - startTime}ms`);
