const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8");

const lines = input.split("\n");

const sum = lines.reduce((tally, line) => {
  const digits = new Map();
  let one, two, three, four, five, six, seven, eight, nine, zero;
  let signals = line.split("|")[0].trim().split(" ");
  let numbers = line.split("|")[1].trim().split(" ");

  [one, signals] = findShortest(signals);
  digits.set(one, 1);

  [seven, signals] = findShortest(signals);
  digits.set(seven, 7);

  [four, signals] = findShortest(signals);
  digits.set(four, 4);

  [eight, signals] = findLongest(signals);
  digits.set(eight, 8);

  [nine, signals] = findShortestCombination(signals, seven, four);
  digits.set(nine, 9);

  [three, signals] = findShortestCombination(signals, seven);
  digits.set(three, 3);

  const top = subtract(seven, one);
  const bottom = subtract(nine, four, top);
  const center = subtract(three, seven, bottom);

  zero = subtract(eight, center);
  digits.set(zero, 0);
  signals = signals.filter(entry => sortString(entry) !== zero);

  [six, signals] = findLongest(signals);
  digits.set(six, 6);

  const topRight = subtract(eight, six);
  [two, signals] = findShortestCombination(signals, topRight)
  digits.set(two, 2);

  five = sortString(signals[0]);
  digits.set(five, 5);

  const sum = numbers.reduce((tally, current) => tally += digits.get(sortString(current)), "")
  return tally + parseInt(sum, 10);
}, 0)

console.log(sum);

function findShortest(line = []) {
  line.sort((a, b) => a.length - b.length)[0];
  const shortest = line.splice(0, 1);
  return [sortString(shortest[0]), line];
}

function findLongest(line = []) {
  line.sort((a, b) => b.length - a.length)[0];
  const longest = line.splice(0, 1);
  return [sortString(longest[0]), line];
}

function findShortestCombination(line = [], ...parts) {
  const requiredChars = new Set(parts.join(""));
  const candidate = line.sort((a, b) => a.length - b.length).find(digit => {
    for (const char of requiredChars) {
      if (!digit.includes(char)) return false;
    }
    return true;
  })
  const truncatedLine = line.filter((digit) => candidate !== digit)
  return [sortString(candidate), truncatedLine];
}

function subtract(base, ...subtrahends) {
  let remaining = [...base];
  for (const subtrahend of subtrahends) {
    remaining = remaining.filter((char) => ![...subtrahend].includes(char))
  }
  return remaining.join("");
}

function sortString(toSort) {
  return [...toSort].sort((a, b) => a < b ? -1 : 1).join("");
}

const endTime = new Date();
console.log(`${endTime - startTime}ms`);
