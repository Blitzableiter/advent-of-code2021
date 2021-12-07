const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8");

const crabs = input.split(",").map(str => parseInt(str, 10)).sort((a, b) => a - b);
const median = crabs.length / 2;
const medianCrab = (crabs[median] + crabs[median - 1]) / 2;

const fuel = crabs.reduce((total, current) => total += Math.abs(current - medianCrab), 0);
console.log(fuel);

const endTime = new Date();

console.log(`${endTime - startTime}ms`);
