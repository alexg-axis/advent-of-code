import { BinaryHeap } from "https://deno.land/x/collections@v0.10.2/binary_heap.ts";

import { Input } from "../../utils/deno/input.ts";

type Map = number[][];
type Coordinate = [number, number];

export function parseInput(input: Input): Map {
  return input.lines.map(x => x.split("").map(Number));
}

export function solvePart1(input: Map): number {
  const costs = input.map(x => new Array<number>(x.length).fill(Number.MAX_VALUE));
  const compare = ([ax, ay]: Coordinate, [bx, by]: Coordinate) => costs[ay][ax] - costs[by][bx];
  const queue = new BinaryHeap<Coordinate>(compare);

  const visited = input.map(x => new Array<boolean>(x.length).fill(false));

  queue.push([0, 0]);
  costs[0][0] = 0;

  while (queue.length > 0) {
    const [column, row] = queue.pop()!;
    if (visited[row][column])
      continue;

    visited[row][column] = true;

    // Goal is bottom right
    if (row + 1 === input.length && column + 1 === input[row].length)
      break;

    const adjacent = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    for (const [dx, dy] of adjacent) {
      const newRow = row + dy;
      const newColumn = column + dx;
      if (newColumn < 0 || newRow < 0) continue;
      if (newRow >= input.length || newColumn >= input[newRow].length) continue;

      if (visited[newRow][newColumn])
        continue;

      const newCost = costs[row][column] + input[newRow][newColumn];
      if (newCost < costs[newRow][newColumn]) {
        costs[newRow][newColumn] = newCost;
      }

      queue.push([newColumn, newRow]);
    }
  }

  // Print cost map and path map
  // console.log(costs.map(x => x.map(y => y.toString().padStart(3, " ")).join("")).join("\n"));

  return costs[costs.length - 1][costs[0].length - 1];
}
