const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8");
const depths = input.split(/\s+/).map((string) => parseInt(string));
console.log(depths);
let counter = 0;
for (depthIndex in depths) {
	if (depthIndex < 2) continue;
	let currentSum = depths[depthIndex];
	currentSum += depths[depthIndex-1]
	currentSum += depths[depthIndex-2]
	let prevSum = depths[depthIndex-1];
	prevSum += depths[depthIndex-2]
	prevSum += depths[depthIndex-3]
	if (currentSum > prevSum) counter++;
}
console.log(counter);
