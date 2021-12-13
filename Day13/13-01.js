const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

let dots = [];
const folds = [];
input.forEach((line = "") => {
  if (line.match(/^\d+/)) {
    const [x, y] = line.split(",").map(str => parseInt(str, 10));
    dots.push({ x, y })
  } else if (line.match(/fold/)) {
    folds.push(line.split(" ")[2].split("=")); // [axis, value]
  }
})
dots = foldAlong(dots, folds[0]);
// console.log("dots after", dots);
console.log(dots.length);

function foldAlong(dotsToFold = [], [foldAxis, foldValue]) {
  // loop over entries and "fold" -> decrease dot-value of axis by double of
  // difference between old and fold value if fold value < dot-value of axis
  let dotsAfterFold = [];
  for (const dot of dotsToFold) {
    // value of dot > fold value
    if (dot[foldAxis] > foldValue) {
      const newValue = dot[foldAxis] - 2 * (dot[foldAxis] - foldValue)
      const newDot = { ...dot };
      newDot[foldAxis] = newValue;
      if (!dotsToFold.find(({ x, y }) => x === newDot.x && y === newDot.y)) {
        dotsAfterFold.push(newDot)
      }
    } else {
      dotsAfterFold.push(dot);
    }
  }
  return dotsAfterFold;
}
const endTime = new Date();
console.log(`${endTime - startTime}ms`);
