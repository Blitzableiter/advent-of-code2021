const fs = require("fs");

const inputFile = fs.readFileSync("./input.txt", "utf8");
const input = inputFile.split("\n");

const draw = input[0].split(",").map((string) => parseInt(string, 10));

let boards = inputFile
	.split("\n\n") // split boards on double line feed
	.slice(1) // remove draw
	.map((board) => board.split("\n")) // split each board into rows
	.map((board) =>
		board.map((row) =>
			row
				.replace(/\s+/g, " ") // replace multi spaces by single spaces
				.trim() // trim leading and trailing spaces
				.split(" ") // split on spaces
				.map((string) => parseInt(string, 10))
		)
	); // parse fields to int

// console.log(draw);
for (const num of draw) {
	boards = boards.map((board) =>
		board.map((row) => {
			const newRow = [...row];
			const index = row.indexOf(num);
			if (index >= 0) {
				newRow[index] = "X";
			}
			return newRow;
		})
	);
	const indexOfWinningBoard = hasWon(boards);
	// console.log(indexOfWinningBoard);
	if (indexOfWinningBoard >= 0) {
		console.log(num); 
		console.log(boards[indexOfWinningBoard]);
    const scoreOfWinningBoard = calculateScoreOfBoard(boards[indexOfWinningBoard]);
    console.log(scoreOfWinningBoard);
    console.log("final score:",num*scoreOfWinningBoard);
		break;
	}
}

function hasWon(boardsToEval = [[]]) {
	// console.log(boardsToEval);
	for (const board of boardsToEval) {
		/* eslint-disable no-param-reassign */
		if (
			board.reduce((won, row = []) => {
				if (row.every((val) => val === "X")) won = true;
				return won;
			}, false)
		) {
			console.log("win in row");
			return boardsToEval.indexOf(board);
		}
		/* eslint-enable no-param-reassign */
		for (const column of [0,1,2,3,4]) {
      let sumInColumn = 0;
      for (const row of board) {
        if (row[column] === "X") {
          sumInColumn++;
        }
      }
      if (sumInColumn === board[0].length) {
         console.log("win in column");
         return boardsToEval.indexOf(board);
      }  
    }
	}
	return -1;
}

function calculateScoreOfBoard(board = [[]]) {
  let score = 0;
  for (const row of board) {
    for (const val of row) {
      if (val !== "X") score+=parseInt(val, 10);
    }
  }
  return score;
}
