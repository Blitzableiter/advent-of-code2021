const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8");

const binaries = input.split(/\n/);
const starters = "0".repeat(binaries[0].length).split("").map((val) => parseInt(val, 10));

let matchingOxygen = [...binaries];
let matchingCo2 = [...binaries];

function boolToInt(bool = true) {
  if (bool) return 1;
  return 0;
}

function findMostInPosition(posToEval = 0, candidates = [], findMax = true) {
  // number of 1s in given Position
  let onesInPosition = 0;

  if (candidates.length === 1) return candidates;

  for (const candidate of candidates) {
    // if the candidate has a 1 in the position, add 1 to the sum
    if (parseInt(candidate[posToEval], 2) === 1) onesInPosition += 1;
  }

  // if the sum of 1s in the position is half or more
  if (onesInPosition * 2 >= candidates.length) {
    // filter candidates that have 1s in the given position
    return candidates.filter((cand) => parseInt(cand[posToEval], 2) === boolToInt(findMax));
  }
  // filter candidates that have 0s in the given position
  return candidates.filter((cand) => parseInt(cand[posToEval], 2) !== boolToInt(findMax));
}

for (const posIndex in starters) {
  if ({}.hasOwnProperty.call(starters, posIndex)) {
    matchingOxygen = findMostInPosition(posIndex, matchingOxygen, true);
    // console.log(matchingCo2);
    matchingCo2 = findMostInPosition(posIndex, matchingCo2, false);
  }
}

console.log(parseInt(matchingOxygen[0], 2) * parseInt(matchingCo2[0], 2));
