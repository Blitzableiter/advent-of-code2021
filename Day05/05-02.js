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
    } else if (this.yEqual(otherPoint)) {
      if (this.x > otherPoint.x) {
        for (let i = this.x; i >= otherPoint.x; i--) {
          spots.push(new Point(i, this.y));
        }
      } else {
        for (let i = this.x; i <= otherPoint.x; i++) {
          spots.push(new Point(i, this.y));
        }
      }
    } else {
      const [xs, ys] = calcPointsBetween(this, otherPoint);
      for (const index in xs) {
        const p = new Point(xs[index], ys[index]);
        spots.push(p);
      }
    }
    return spots;
  }
}

function calcPointsBetween(pointA = new Point(), pointB = new Point()) {
  // { 0, 3 }
  // [[0, 1, 2, 3],
  // [3, 2, 1, 0]]
  // { 3, 0 }
  let x = pointA.x;
  let xs = [x];
  if (pointA.x < pointB.x) {
    while (x < pointB.x) {
      x += 1;
      xs.push(x);
    }
  } else {
    while (x > pointB.x) {
      x -= 1;
      xs.push(x);
    }
  }

  let y = pointA.y;
  let ys = [y];
  if (pointA.y < pointB.y) {
    while (y < pointB.y) {
      y += 1;
      ys.push(y);
    }
  } else {
    while (y > pointB.y) {
      y -= 1;
      ys.push(y);
    }
  }

  return [xs, ys];
}

const lines = input.split(/\n/);
const vents = lines.map((line) => line.split(" -> ").map((point) => {
  const [x, y] = point.split(",");
  const p = new Point(parseInt(x, 10), parseInt(y, 10));
  return p;
}));
const straightVents = [];
// for (const vent of vents) {
//   if (vent[0].xEqual(vent[1]) || vent[0].yEqual(vent[1])) { straightVents.push(vent); }
// }
const grid = {};
for (const vent of vents) {
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
