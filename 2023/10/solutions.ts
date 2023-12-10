import { createCanvas } from "https://deno.land/x/canvas/mod.ts";
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";

import { Input } from "../../utils/deno/input.ts";

// - `|` is a __vertical pipe__ connecting north and south.
// - `-` is a __horizontal pipe__ connecting east and west.
// - `L` is a __90-degree bend__ connecting north and east.
// - `J` is a __90-degree bend__ connecting north and west.
// - `7` is a __90-degree bend__ connecting south and west.
// - `F` is a __90-degree bend__ connecting south and east.
// - `.` is __ground__; there is no pipe in this tile.
// - `S` is the __starting position__ of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

type Cell = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";

/* [x, y] */
type Coordinate = [number, number];

interface Node {
  type: Cell;
  adjacent: Coordinate[];
}

type Graph = {
  nodes: Node[][];
  start: Coordinate;
};

function findExpectedCell(nodes: Node[][], x: number, y: number): Cell {
  const startConnections = [
    // North
    y > 1 && ["|", "7", "F"].includes(nodes[y - 1][x].type),
    // West
    x > 1 && ["-", "L", "F"].includes(nodes[y][x - 1].type),
    // East
    x < nodes[0].length - 1 && ["-", "J", "7"].includes(nodes[y][x + 1].type),
    // South
    y < nodes.length - 1 && ["|", "L", "J"].includes(nodes[y + 1][x].type),
  ]
    .map((x) => (x ? "1" : "0"))
    .join("");

  switch (startConnections) {
    case "0000":
      return ".";
    case "0011":
      return "F";
    case "0101":
      return "7";
    case "0110":
      return "-";
    case "1001":
      return "|";
    case "1010":
      return "L";
    case "1100":
      return "J";
  }

  throw new Error("no possible cell");
}

function findAdjacent(type: Cell, x: number, y: number): Coordinate[] {
  switch (type) {
    case ".":
      // Ground - no neighbours
      return [];
    case "|":
      return [
        [x, y - 1],
        [x, y + 1],
      ];
    case "-":
      return [
        [x - 1, y],
        [x + 1, y],
      ];
    case "L":
      return [
        [x, y - 1],
        [x + 1, y],
      ];
    case "J":
      return [
        [x, y - 1],
        [x - 1, y],
      ];
    case "7":
      return [
        [x - 1, y],
        [x, y + 1],
      ];
    case "F":
      return [
        [x + 1, y],
        [x, y + 1],
      ];
  }

  throw new Error("no such cell");
}

function parseGraph(input: Input): Graph {
  const nodes: Node[][] = [];
  let start: Coordinate | undefined;

  const lines = input.lines;
  for (let y = 0; y < lines.length; y++) {
    const row: Node[] = [];
    nodes.push(row);
    for (let x = 0; x < lines[y].length; x++) {
      const node: Node = {
        type: lines[y][x] as Cell,
        adjacent: [],
      };
      row.push(node);

      if (node.type === "S") {
        start = [x, y];
      } else {
        node.adjacent = findAdjacent(node.type, x, y);
      }
    }
  }

  if (!start) {
    throw new Error("no start found");
  }

  // Fill in the starting position
  nodes[start[1]][start[0]].type = findExpectedCell(nodes, start[0], start[1]);
  nodes[start[1]][start[0]].adjacent = findAdjacent(
    nodes[start[1]][start[0]].type,
    start[0],
    start[1]
  );

  return { nodes, start };
}

export function solvePart1(input: Input): number {
  const graph = parseGraph(input);

  // Each cell contains the maximum distance
  const maximums = graph.nodes.map((x) => x.map(() => 0));
  maximums[graph.start[1]][graph.start[0]] = -1;

  const toVisit: [number, Coordinate][] = [[0, graph.start]];
  while (toVisit.length > 0) {
    const [moves, [x, y]] = toVisit.shift()!;
    for (const [nextX, nextY] of graph.nodes[y][x].adjacent) {
      if (maximums[nextY][nextX]) {
        continue;
      }

      maximums[nextY][nextX] = moves + 1;
      toVisit.push([moves + 1, [nextX, nextY]]);
    }
  }

  return maximums.flat().sort((a, b) => b - a)[0];
}

export function solvePart2(input: Input): number {
  const graph = parseGraph(input);

  const canvas = createCanvas(
    graph.nodes[0].length * 3,
    graph.nodes.length * 3
  );
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, graph.nodes[0].length * 3, graph.nodes.length * 3);
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";

  let visited = graph.nodes.map((x) => x.map(() => 0));
  let toVisit: Coordinate[] = [graph.start];
  while (toVisit.length > 0) {
    const [x, y] = toVisit.shift()!;
    // Paint the cell itself
    ctx.fillRect(x * 3 + 1, y * 3 + 1, 1, 1);

    for (const [nextX, nextY] of graph.nodes[y][x].adjacent) {
      // Connect with adjacent
      ctx.fillStyle = "red";
      ctx.fillRect(
        Math.min(x, nextX) * 3,
        Math.min(y, nextY) * 3,
        Math.max(Math.abs(x - (nextX + 1)) * 3, 3),
        Math.max(Math.abs(y - (nextY + 1)) * 3, 3)
      );

      if (visited[nextY][nextX]) {
        continue;
      }

      visited[nextY][nextX] = 1;
      toVisit.push([nextX, nextY]);
    }
  }

  visited = graph.nodes.map((x) => x.map(() => 0));
  toVisit = [graph.start];
  while (toVisit.length > 0) {
    const [x, y] = toVisit.shift()!;
    // Paint the cell itself
    ctx.fillRect(x * 3 + 1, y * 3 + 1, 1, 1);

    for (const [nextX, nextY] of graph.nodes[y][x].adjacent) {
      // Connect with adjacent
      ctx.fillStyle = "white";
      ctx.fillRect(
        Math.min(x, nextX) * 3 + 1,
        Math.min(y, nextY) * 3 + 1,
        Math.max(Math.abs(x - nextX) * 3, 1),
        Math.max(Math.abs(y - nextY) * 3, 1)
      );

      if (visited[nextY][nextX]) {
        continue;
      }

      visited[nextY][nextX] = 1;
      toVisit.push([nextX, nextY]);
    }
  }

  Deno.writeFile(
    path.join(path.dirname(path.fromFileUrl(import.meta.url)), "out.png"),
    canvas.toBuffer()
  );

  console.log("1. Open out.png in photo editor");
  console.log("2. Make all red pixels black");
  console.log("3. Select and remove all surrounding black pixels");
  console.log("4. Select and remove all white pixels");
  console.log("5. Count black pixels");
  console.log("6. Divide by 9");

  return -1;
}
