const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8");
const lines = input.split("\n");

const incomplete = [];
for (const line of lines) {
  const stack = [];
  let corrupt = false;
  for (const char of line) {
    if (["[", "(", "{", "<"].includes(char)) { // opening bracket
      stack.push(char);
    } else if (match(stack[stack.length - 1], char)) {
      stack.pop();
    } else {
      corrupt = true;
      break;
    }
  }
  if (!corrupt) incomplete.push(line);
}

const partners = {
  "{": "}",
  "[": "]",
  "(": ")",
  "<": ">"
}


const scores = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4
};

let lineScores = [];
for (const line of incomplete) {
  const stack = [];
  for (const char of line) {
    if (["[", "(", "{", "<"].includes(char)) { // opening bracket
      stack.push(char);
    } else {
      stack.pop();
    }
  }
  let score = 0;
  stack.reverse();
  console.log(stack);
  for (const char of stack) {
    score = determineScore(score, partners[char]);
  }
  lineScores.push(score);
}

lineScores.sort((a, b) => a - b);
console.log(lineScores[(lineScores.length - 1) / 2]);


function determineScore(currentScore, char) {
  console.log("currentScore", currentScore);
  let newScore = currentScore * 5;
  console.log("newScore", newScore);
  newScore += scores[char];
  console.log("newScore", newScore);
  return newScore;
}





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
