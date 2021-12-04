const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

// down = depth++
// up = depth--
// forward = x++
let x = 0, depth = 0;
const commands = input.split(/\n/);
for (const command of commands){
  let [direction, amount] = command.split(/\s/);
  amount = parseInt(amount);
  switch (direction) {
    case "forward":
      x+= amount;
      break;
    case "up":
      depth -= amount;
      break;
    case "down":
      depth += amount;
      break;
  }
}
console.log("x:",x);
console.log("depth:",depth);
console.log(x*depth);