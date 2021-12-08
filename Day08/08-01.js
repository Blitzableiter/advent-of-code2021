const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8");

const outputs = input.split("\n").map(line => line.split("|")[1].trim().split(" "));

const total = outputs.map(line => line.reduce((tally, current) => {
  if (([2, 3, 4, 7].includes(current.length))) tally += 1;
  return tally;
}, 0))
  .reduce((tally, current) => tally += current)
console.log(total);

const endTime = new Date();
console.log(`${endTime - startTime}ms`);
