import type {Input} from "../../utils/deno/input.ts";

type Order = number[];
// 5x5 bingo board
type Cell = {
  number: number,
  marked: boolean,
};
type Board = Array<Array<Cell>>;

export function parseInput(input: Input): [Order, Board[]] {
  const lines = input.lines;

  const order = lines[0].split(",").map(x => Number(x)) as Order;
  const boards: Board[] = [];

  // Ignore the first line and the first empty line,
  // then read five rows worth of bingo board, then
  // skip the trailing newline. Repeat for the rest
  // of the input
  for (let i = 2; i < lines.length; i += 6) {
    const board: Board = [];
    for (let j = 0; j < 5; j++) {
      board[j] = lines[i + j].replaceAll(/ +/g, " ").trim().split(" ").map(x => ({number: Number(x), marked: false}));
    }
    boards.push(board);
  }

  return [order, boards];
}

function markBoard(board: Board, number: number) {
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board.length; column++) {
      if (board[row][column].number === number)
        board[row][column].marked = true;
    }
  }
}

function checkBoard(board: Board): boolean {
  for (let row = 0; row < board.length; row++) {
    let count = 0;
    for (let column = 0; column < board.length; column++) {
      if (board[row][column].marked)
        count++;
    }
    if (count === board.length)
      return true;
  }

  for (let column = 0; column < board.length; column++) {
    let count = 0;
    for (let row = 0; row < board.length; row++) {
      if (board[row][column].marked)
        count++;
    }
    if (count === board.length)
      return true;
  }

  return false;
}

function unmarkedSum(board: Board): number {
  let sum = 0;
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board.length; column++) {
      if (!board[row][column].marked)
        sum += board[row][column].number;
    }
  }
  return sum;
}

export function solvePart1(order: Order, boards: Board[]): [number, number] {
  for (const called of order) {
    for (const board of boards) {
      markBoard(board, called);
      if (checkBoard(board)) {
        const sum = unmarkedSum(board);
        return [sum, called];
      }
    }
  }

  return [-1, -1];
}
