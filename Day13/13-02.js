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
for (const fold of folds) {
  dots = foldAlong(dots, fold);
}
// paint dots
printDots(dots)

const endTime = new Date();
console.log(`${endTime - startTime}ms`);



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

function printDots(dots = []) {
  // bring dots into 2d array
  const { xMax: xExtend, yMax: yExtend } = dots.reduce(({ xMax, yMax }, { x, y }) => {
    if (x > xMax) xMax = x;
    if (y > yMax) yMax = y;
    return { xMax, yMax };
  }, ({ xMax: 0, yMax: 0 }))

  let dotsToPrint = new Array(yExtend + 1).fill([]);
  dotsToPrint = dotsToPrint.map(row => new Array(xExtend + 1).fill(" "));

  // transform 2d array into big string
  for (const dot of dots) {
    dotsToPrint[dot.y][dot.x] = "#";
  }
  let print = "";
  for (const row of dotsToPrint) {
    print += row.join("") + "\n";
  }
  console.log(print);
}