import { Input } from "../../utils/deno/input.ts";

type Map = Cell[][];

type Herd = ">" | "v";

type Cell = Herd | ".";

export function parseInput(input: Input): Map {
  return input.lines.map(x => x.split("") as Cell[]);
}

function step(map: Map): [Map, number] {
  const next: Map = [];
  let steps = 0;

  // >
  for (let y = 0; y < map.length; y++) {
    next[y] = new Array(map[y].length).fill(".");
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== ">")
        continue;

      const nextX = (x + 1) % map[y].length;
      if (map[y][nextX] === ".") {
        next[y][nextX] = ">";
        steps++;
      } else
        next[y][x] = ">";
    }
  }

  // v
  for (let x = 0; x < map[0].length; x++) {
    for (let y = 0; y < map.length; y++) {
      if (map[y][x] !== "v")
        continue;

      const nextY = (y + 1) % map.length;
      const nextCell = map[nextY][x];
      const cellWillBeBlocked = map[nextY][((x - 1) + map[nextY].length) % map[nextY].length] === ">";
      const obstacleWillMove = nextCell === ">" && next[nextY][x] !== ">";
      if ((nextCell === "." && !cellWillBeBlocked) || obstacleWillMove) {
        next[nextY][x] = "v";
        steps++;
      } else
        next[y][x] = "v";
    }
  }

  return [next, steps];
}

function printMap(map: Map) {
  for (const line of map)
    console.log(line.join(""));
}

export function solvePart1(map: Map): number {
  // console.log("Initial state:");
  // printMap(map);
  let iterations = 0;
  while (true) {
    // console.log()
    const [next, steps] = step(map);
    if (steps === 0)
      return iterations + 1;
    map = next;
    // console.log(`After ${i + 1} steps:`);
    // printMap(map);
    iterations++;
  }
}
