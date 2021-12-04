const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8");

// down = depth++
// up = depth--
// forward = x++
let gamma = ""; let
  epsilon = "";
const binaries = input.split(/\n/);
const max = binaries.length;
const starters = "0".repeat(binaries[0].length).split("").map((val) => parseInt(val, 10));
for (const binary of binaries) {
  for (const bit in binary) {
    if (parseInt(binary[bit], 2)) starters[bit] += 1;
  }
}
for (const count of starters) {
  if (count * 2 < max) {
    gamma += "0";
    epsilon += "1";
  } else {
    gamma += "1";
    epsilon += "0";
  }
}

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
