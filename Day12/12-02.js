const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

console.log(input);
const tunnels = new Map();
input.forEach((route) => {
  const [caveA, caveB] = route.split("-");
  if (!tunnels.get(caveA)) {
    tunnels.set(caveA, []);
  }
  if (!tunnels.get(caveB)) {
    tunnels.set(caveB, []);
  }
  tunnels.get(caveA).push(caveB);
  tunnels.get(caveB).push(caveA);
});

const paths = [];
// currentCave = cave to next travel to; path = caves visited
function traverse(currentCave, path = []) {
  path.push(currentCave);
  // done with path
  if (currentCave === "end") {
    paths.push(path);
  } else {
    // find the lower case cave that has already been visited twice, if any
    const lowerCaseDoubleVisit = [...path]
      .sort((a, b) => (a < b ? -1 : 1)) // string comparison
      .find((val, index, arr) => ((val === val.toLowerCase() && index > 0) ? val === arr[index - 1] : false));
    // which caves can be traveled to from here
    const targetCaves = tunnels.get(currentCave).filter((cave) => cave !== "start").filter((cave) => {
      // lower case caves can only be visited twice, if no other lc cave has been visited twice yet
      if (cave === cave.toLowerCase() && path.filter((c) => c === cave).length >= 1 && lowerCaseDoubleVisit) return false;
      return true;
    });
    for (const target of targetCaves) {
      traverse(target, [...path]);
    }
  }
}
traverse("start");
console.log(paths);
console.log(paths.length);

const endTime = new Date();
console.log(`${endTime - startTime}ms`);
