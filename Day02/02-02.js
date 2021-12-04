const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

// down = depth++
// up = depth--
// forward = x++
let x = 0, depth = 0, aim = 0;
const commands = input.split(/\n/);
for (const command of commands){
  let [direction, amount] = command.split(/\s/);
  amount = parseInt(amount);
  switch (direction) {
    case "forward":
      x+= amount;
      depth += aim * amount;
      break;
    case "up":
      aim -= amount;
      break;
    case "down":
      aim += amount;
      break;
  }
}
console.log("x:",x);
console.log("depth:",depth);
console.log(x*depth);