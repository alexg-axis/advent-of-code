import { Input } from "../../utils/deno/input.ts";

type Paper = boolean[][];
type Fold = [number, number];

export function parseInput(input: Input): [Paper, Fold[]] {
  const sections = input.raw.trim().split("\n\n");

  const paper: Paper = [];
  let width = 0;
  let height = 0;
  for (const line of sections[0].split("\n")) {
    const [x, y] = line.split(",").map(Number);
    if (paper[y] === undefined)
      paper[y] = [];
    paper[y][x] = true;
    if (x + 1 > width)
      width = x + 1;
    if (y + 1 > height)
      height = y + 1;
  }

  // Fill
  for (let y = 0; y < height; y++) {
    if (typeof paper[y] === 'undefined')
      paper[y] = [];
    for (let x = 0; x < width; x++) {
      if (typeof paper[y][x] === 'undefined')
        paper[y][x] = false;
    }
  }

  const folds: Fold[] = [];
  for (const foldInstruction of sections[1].split("\n")) {
    const [axis, value] = foldInstruction.replace("fold along ", "").split("=");
    const fold: Fold = [0, 0];
    if (axis === "x")
      fold[0] = Number(value);
    else
      fold[1] = Number(value);
    folds.push(fold);
  }

  return [paper, folds];
}

function printPaper(paper: Paper) {
  for (const line of paper)
    console.log(line.map(x => x ? "#" : ".").join(""));
}

function foldUp(paper: Paper, start: number) {
  for (let y = 0; y < paper.length - start; y++) {
    for (let x = 0; x < paper[y].length; x++)
      paper[start - y][x] ||= paper[start + y][x];
  }
  // Delete fold
  for (let y = paper.length - 1; y >= start; y--)
    delete paper[y];
  paper.length -= paper.length - start;
}

function foldLeft(paper: Paper, start: number) {
  for (let x = 0; x < paper[0].length - start; x++) {
    for (let y = 0; y < paper.length; y++)
      paper[y][start - x] ||= paper[y][start + x];
  }
  // Delete fold
  for (let x = paper[0].length - 1; x >= start; x--) {
    for (let y = 0; y < paper.length; y++) {
      delete paper[y][x];
      paper[y].length -= paper[y].length - start;
    }
  }
}

export function solvePart1([paper, folds]: [Paper, Fold[]]): number {
  const [x, y] = folds[0];
  if (x === 0)
    foldUp(paper, y);
  else
    foldLeft(paper, x);

  return paper.reduce((marked, lines) => marked + lines.filter(x => x).length, 0);
}
