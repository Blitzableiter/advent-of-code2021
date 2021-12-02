const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8");
const depths = input.split(/\s+/).map((string) => parseInt(string));
console.log(depths);
let counter = 0;
for (depthIndex in depths) {
	if (depthIndex === 0) continue;
	if (depths[depthIndex] > depths[depthIndex - 1]) counter++;
}
console.log(counter);
