import { combinations } from "https://deno.land/x/combinatorics@1.0.1/combinations.ts";
import { Input } from "../../utils/deno/input.ts";

type Map = ("." | "/" | "\\" | "|" | "-")[][];

function isWithinBounds(map: Map, x: number, y: number): boolean {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

function solve(
  map: Map,
  [[x, y], [dx, dy]]: [[number, number], [number, number]]
): number {
  if (!isWithinBounds(map, x + dx, y + dy)) {
    return -1;
  }

  const filled = new Array(map.length)
    .fill(null)
    .map(() => new Array(map[0].length).fill(0));

  const seen: Record<string, boolean> = {};

  const beams: [[number, number], [number, number]][] = [
    [
      [x, y],
      [dx, dy],
    ],
  ];
  for (let i = 0; i < 1e9 && beams.length > 0; i++) {
    let [[x, y], [dx, dy]] = beams.shift()!;

    const key = `${x}:${y}:${dx}:${dy}`;
    if (seen[key]) {
      continue;
    } else {
      seen[key] = true;
    }

    const withinBounds =
      x + dx >= 0 &&
      x + dx < map[0].length &&
      y + dy >= 0 &&
      y + dy < map.length;

    if (!withinBounds) {
      continue;
    }

    x += dx;
    y += dy;

    const tile = map[y][x];
    filled[y][x]++;
    switch (tile) {
      case ".":
        beams.push([
          [x, y],
          [dx, dy],
        ]);
        break;
      case "-":
        if (dy !== 0) {
          beams.push([
            [x, y],
            [-1, 0],
          ]);
          beams.push([
            [x, y],
            [1, 0],
          ]);
        } else {
          beams.push([
            [x, y],
            [dx, 0],
          ]);
        }
        break;
      case "|":
        if (dx !== 0) {
          beams.push([
            [x, y],
            [0, -1],
          ]);
          beams.push([
            [x, y],
            [0, 1],
          ]);
        } else {
          beams.push([
            [x, y],
            [0, dy],
          ]);
        }
        break;
      case "/":
        if (dx === 1) {
          beams.push([
            [x, y],
            [0, -1],
          ]);
        } else if (dx === -1) {
          beams.push([
            [x, y],
            [0, 1],
          ]);
        } else if (dy === 1) {
          beams.push([
            [x, y],
            [-1, 0],
          ]);
        } else if (dy === -1) {
          beams.push([
            [x, y],
            [1, 0],
          ]);
        }
        break;
      case "\\":
        if (dx === 1) {
          beams.push([
            [x, y],
            [0, 1],
          ]);
        } else if (dx === -1) {
          beams.push([
            [x, y],
            [0, -1],
          ]);
        } else if (dy === 1) {
          beams.push([
            [x, y],
            [1, 0],
          ]);
        } else if (dy === -1) {
          beams.push([
            [x, y],
            [-1, 0],
          ]);
        }
        break;
    }
  }

  // console.log(
  //   filled.map((x) => x.map((x) => (x > 0 ? "#" : ".")).join("")).join("\n")
  // );

  return filled.map((x) => x.filter((x) => x > 0)).flat().length;
}

export function solvePart1(input: Input): number {
  const map = input.lines.map(
    (x) => x.split("") as ("." | "/" | "\\" | "|" | "-")[]
  );

  return solve(map, [
    [-1, 0],
    [1, 0],
  ]);
}

export function solvePart2(input: Input): number {
  const map = input.lines.map(
    (x) => x.split("") as ("." | "/" | "\\" | "|" | "-")[]
  );

  const possible: number[] = [];
  for (let y = -1; y <= map.length; y++) {
    possible.push(
      solve(
        [...map.map((x) => [...x])],
        [
          [-1, y],
          [1, 0],
        ]
      ),
      solve(
        [...map.map((x) => [...x])],
        [
          [map[0].length, y],
          [0, -1],
        ]
      )
    );
  }
  for (let x = -1; x <= map[0].length; x++) {
    possible.push(
      solve(
        [...map.map((x) => [...x])],
        [
          [x, -1],
          [0, 1],
        ]
      ),
      solve(
        [...map.map((x) => [...x])],
        [
          [x, map.length],
          [0, -1],
        ]
      )
    );
  }

  return possible.sort((a, b) => b - a)[0];
}
