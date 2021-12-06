const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8");
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  xEqual(otherPoint) {
    return this.x === otherPoint.x;
  }

  yEqual(otherPoint) {
    return this.y === otherPoint.y;
  }

  equals(otherPoint) {
    return (this.x === otherPoint.x && this.y === otherPoint.y);
  }

  toString() {
    return `${this.x},${this.y}`;
  }

  drawTo(otherPoint) {
    const spots = [];
    if (this.equals(otherPoint)) { return spots; }
    if (this.xEqual(otherPoint)) {
      if (this.y > otherPoint.y) {
        for (let i = this.y; i >= otherPoint.y; i--) {
          spots.push(new Point(this.x, i));
        }
      } else {
        for (let i = this.y; i <= otherPoint.y; i++) {
          spots.push(new Point(this.x, i));
        }
      }
    }
    if (this.yEqual(otherPoint)) {
      if (this.x > otherPoint.x) {
        for (let i = this.x; i >= otherPoint.x; i--) {
          spots.push(new Point(i, this.y));
        }
      } else {
        for (let i = this.x; i <= otherPoint.x; i++) {
          spots.push(new Point(i, this.y));
        }
      }
    }
    return spots;
  }
}

const lines = input.split(/\n/);
const vents = lines.map((line) => line.split(" -> ").map((point) => {
  const [x, y] = point.split(",");
  const p = new Point(parseInt(x, 10), parseInt(y, 10));
  return p;
}));
const straightVents = [];
for (const vent of vents) {
  if (vent[0].xEqual(vent[1]) || vent[0].yEqual(vent[1])) { straightVents.push(vent); }
}
const grid = {};
for (const vent of straightVents) {
  const points = vent[0].drawTo(vent[1]);
  points.forEach((point) => {
    if (!Object.prototype.hasOwnProperty.call(grid, point.toString())) {
      grid[point.toString()] = 1;
    } else {
      grid[point.toString()] = grid[point.toString()] + 1;
    }
  });
}
const entries = Object.entries(grid);
const overlap = entries.filter(([point, value]) => value > 1);
console.log(overlap);
console.log(overlap.length);
