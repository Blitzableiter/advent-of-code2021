const fs = require("fs");

const inputFile = fs.readFileSync("./input.txt", "utf8");
const input = inputFile.split("\n");

const draw = input[0].split(",").map((string) => parseInt(string, 10));

let boards = inputFile
  .split("\n\n") // split boards on double line feed
  .slice(1) // remove draw
  .map((board) => board.split("\n")) // split each board into rows
  .map((board) => board.map((row) => row
    .replace(/\s+/g, " ") // replace multi spaces by single spaces
    .trim() // trim leading and trailing spaces
    .split(" ") // split on spaces
    .map((string) => parseInt(string, 10)))); // parse fields to int

// mark draw in boards with "X"
for (const num of draw) {
  boards = boards.map((board) => board.map((row) => {
    const newRow = [...row];
    const index = row.indexOf(num);
    if (index >= 0) {
      newRow[index] = "X";
    }
    return newRow;
  }));

  // find all winning boards on current draw
  const indicesOfWinningBoards = hasWon(boards);

  // sort the array descendingly so not to mess up splicing
  indicesOfWinningBoards.sort((a, b) => b - a);

  // loop over indices of winning boards
  for (const index of indicesOfWinningBoards) {
    console.log("found", indicesOfWinningBoards.length, "winners");
    // splice the board from all boards
    const lastWinner = boards.splice(index, 1)[0];
    console.log("lastWinner", lastWinner);
    console.log("draw:", num);
    console.log("boards", boards);
    // if the array of boards is empty, the last one spliced was the last winner
    if (boards.length === 0) {
      const scoreOfWinningBoard = calculateScoreOfBoard(lastWinner);
      console.log(scoreOfWinningBoard);
      console.log("final score:", num * scoreOfWinningBoard);
      break;
    }
    console.log(); // line break for readability in console
  }
}

function hasWon(boardsToEval = [[]]) {
  const indicesOfWinningBoards = [];

  for (const board of boardsToEval) {
    /* eslint-disable no-param-reassign */
    // traverse rows
    if (
      board.reduce((won, row = []) => {
        if (row.every((val) => val === "X")) won = true;
        return won;
      }, false)
    ) {
      console.log("win in row");
      if (!indicesOfWinningBoards.includes(boardsToEval.indexOf(board))) {
        indicesOfWinningBoards.push(boardsToEval.indexOf(board));
      }
    }
    /* eslint-enable no-param-reassign */

    // traverse columns
    for (const column of [0, 1, 2, 3, 4]) {
      let sumInColumn = 0;
      for (const row of board) {
        if (row[column] === "X") {
          sumInColumn += 1;
        }
      }
      if (sumInColumn === board[0].length) {
        console.log("win in column");
        if (!indicesOfWinningBoards.includes(boardsToEval.indexOf(board))) {
          indicesOfWinningBoards.push(boardsToEval.indexOf(board));
        }
      }
    }
  }
  return indicesOfWinningBoards;
}

function calculateScoreOfBoard(board = [[]]) {
  let score = 0;
  for (const row of board) {
    for (const val of row) {
      // sum up all fields that are not "X"
      if (val !== "X") score += parseInt(val, 10);
    }
  }
  return score;
}
