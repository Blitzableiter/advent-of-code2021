const fs = require("fs");

const startTime = new Date();

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

let template = input.splice(0, 2)[0]; // splice of template and empty line
const insertionRules = new Map();
input.forEach((rule) => {
  const ruleAsArray = rule.split(" -> ");
  insertionRules.set(ruleAsArray[0], ruleAsArray[1])
})

let i = 1;
while (i <= 10) {
  // analyze template and create new template
  template = insertElements(template, insertionRules);

  i += 1;
}
countElements(template);
// console.log(template);

function insertElements(template = "", insertionRules = new Map()) {
  console.log(`inserting for the ${i}th time`);
  let newTemplate = "";
  template.split("").forEach((atom, index, arr) => {
    if (index < arr.length - 1) {
      const pair = arr.slice(index, index + 2).join("")
      const insert = insertionRules.get(pair);
      newTemplate += `${pair.substring(0, 1)}${insert ? insert : ""}${(index === (arr.length - 2)) ? pair.substring(1, 2) : ""}`
    }
  })
  return newTemplate;
}

function countElements(polymer = "") {
  let count = new Map();
  polymer.split("").forEach((el) => {
    if (count.has(el)) {
      count.set(el, count.get(el) + 1)
    } else {
      count.set(el, 1)
    }
  })
  const counts = Array.from(count).sort((a, b) => a[1] - b[1])
  console.log("least:", counts[0]);
  console.log("most :", counts[counts.length - 1]);
  const diff = (parseInt(counts[counts.length - 1][1], 10) - parseInt(counts[0][1], 10));
  console.log("diff :", diff);
}



const endTime = new Date();
console.log(`${endTime - startTime}ms`);
