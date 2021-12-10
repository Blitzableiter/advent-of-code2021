const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8");
const lines = input.split("\n");

const scores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137
}

const corrupt = [];
for (const line of lines) {
  const stack = [];
  for (const char of line) {
    if (["[", "(", "{", "<"].includes(char)) { // opening bracket
      stack.push(char);
    } else if (match(stack[stack.length - 1], char)) {
      stack.pop();
    } else {
      corrupt.push(char);
      break;
    }
  }
}

console.log(corrupt.reduce((tally, current) => tally += scores[current], 0));





function match(opening, closing) {
  if (opening === "[" && closing === "]" ||
    opening === "(" && closing === ")" ||
    opening === "<" && closing === ">" ||
    opening === "{" && closing === "}") {
    return true;
  }
  return false;
}


const endTime = new Date();
console.log(`${endTime - startTime}ms`);
