import { Input } from "../../utils/deno/input.ts";

function hash(x: string): number {
  let currentValue = 0;
  for (let i = 0; i < x.length; i++) {
    currentValue += x.charCodeAt(i);
    currentValue *= 17;
    currentValue %= 256;
  }
  return currentValue;
}

export function solvePart1(input: Input): number {
  const map = input.lines.map(
    (x) => x.split("") as ("." | "/" | "\\" | "|" | "-")[]
  );

  const filled = new Array(map.length)
    .fill(null)
    .map(() => new Array(map[0].length).fill(0));
  filled[0][0] = 1;

  const seen: Record<string, boolean> = {};

  const beams: [[number, number], [number, number]][] = [
    [
      [-1, 0],
      [1, 0],
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
