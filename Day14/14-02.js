const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

let template = input.splice(0, 2)[0]; // splice of template and empty line
let elementPairCount = new Map(); // count how many of each pair exist on chain
let elementCounts = new Map(); // count how often an element exists on chain
template.split("").forEach((letter, index, arr) => {
  if (elementCounts.has(letter)) {
    elementCounts.set(letter, elementCounts.get(letter) + 1)
  } else {
    elementCounts.set(letter, 1);
  }
  if (index === arr.length - 1) return;
  const currentPair = letter + arr[index + 1];
  if (elementPairCount.has(currentPair)) {
    elementPairCount.set(currentPair, elementPairCount.get(currentPair) + 1)
  } else {
    elementPairCount.set(currentPair, 1)
  }
})

const insertionRules = new Map();
input.forEach((rule) => {
  const ruleAsArray = rule.split(" -> ");
  insertionRules.set(ruleAsArray[0], ruleAsArray[1])
})

let i = 1;
while (i <= 40) {
  // analyze template and create new template
  ({ newElementPairCount: elementPairCount, newElementCounts: elementCounts } =
    insertElementsIntoMap(elementPairCount, insertionRules, elementCounts))

  i += 1;
}
countElements(elementCounts);

function insertElementsIntoMap(elementPairCount = new Map(), insertionRules = new Map(), elementCounts = new Map()) {
  let newElementPairCount = new Map();
  let newElementCounts = new Map(elementCounts);

  const entriesIterator = elementPairCount.entries();
  let entry = entriesIterator.next();
  while (!entry.done) {
    const pair = entry.value[0];
    if (elementPairCount.get(pair) === 0) {
      entry = entriesIterator.next();
      continue;
    }

    const insert = insertionRules.get(pair); // find atom to be inserted
    const countOfOldPair = elementPairCount.get(pair);
    // increment or create counter for atom to be inserted
    if (newElementCounts.has(insert)) {
      newElementCounts.set(insert, newElementCounts.get(insert) + 1 * countOfOldPair);
    } else {
      newElementCounts.set(insert, 1);
    }

    // construct new pairs
    const newPair1 = pair.slice(0, 1) + insert;
    const newPair2 = insert + pair.slice(1, 2);

    // insert or update new pairs in counter map
    for (const newPair of [newPair1, newPair2]) { // adds 2ms to runtime but shaves off 3 loc
      if (newElementPairCount.has(newPair)) {
        newElementPairCount.set(newPair, newElementPairCount.get(newPair) + countOfOldPair);
      } else {
        newElementPairCount.set(newPair, countOfOldPair);
      }
    }

    entry = entriesIterator.next();
  }

  return { newElementPairCount, newElementCounts }
}

function countElements(elementCounts = new Map()) {
  const counts = Array.from(elementCounts);
  counts.sort((a, b) => a[1] - b[1])
  console.log("least:", counts[0]);
  console.log("most :", counts[counts.length - 1]);
  console.log("diff :", counts[counts.length - 1][1] - counts[0][1]);
}

const endTime = new Date();
console.log(`${endTime - startTime}ms`);
