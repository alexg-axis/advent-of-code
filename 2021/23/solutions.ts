import { Input } from "../../utils/deno/input.ts";

type Coordinate = {x: number, y: number};

type Map = {
  grid: string[][],
  positions: Coordinate[],
}

const energies = {
  "A": 1,
  "B": 10,
  "C": 100,
  "D": 1000,
};

export function parseInput(input: Input): Map {
  const map: Map = {grid: [], positions: []};

  // Pad each row to make it rectangular. "x" are padded with "#"
  // #############
  // #...........#
  // ###D#A#D#C###
  // xx#C#A#B#B#xx
  // xx#########xx
  const lines = input.lines.map(x => x.replaceAll(" ", "#").padEnd(13, "#"));
  for (let y = 0; y < lines.length; y++) {
    map.grid[y] = [];
    map.grid[y] = lines[y].split("");
  }

  for (let y = 2; y <= 3; y++) {
    for (let x = 3; x <= 9; x += 2)
      map.positions.push({x, y});
  }

  return map;
}

function printMap(map: Map) {
  for (let y = 0; y < map.grid.length; y++)
    console.log(map.grid[y].join(""));
}

function isSolved(map: Map): boolean {
  const amphipods = ["A", "B", "C", "D"];
  return ((map.grid[2][3] in amphipods) && map.grid[2][3] === map.grid[3][3]) && ((map.grid[2][5] in amphipods) && map.grid[2][5] === map.grid[3][5]) && ((map.grid[2][7] in amphipods) && map.grid[2][7] === map.grid[3][7]);
}

function copyMap(map: Map): Map {
  return { grid: map.grid.map(x => [...x]), positions: map.positions.map(x => ({ ...x })) };
}

function makeMove(startMap: Map, energy = 0, depth = 0, state = {cheapestSolution: Number.MAX_VALUE}): [Map, number][] {
  if (depth > 9)
    return [];

  const solutions: [Map, number][] = [];
  for (let amphipod = 0; amphipod < 8; amphipod++) {
    const { x, y } = startMap.positions[amphipod];
    const amphipodType = startMap.grid[y][x];
    const amphipodCost = energies[amphipodType as keyof typeof energies];
    for (let move = 0; move < 4; move++) {
      let newEnergy = energy;
      const map = copyMap(startMap);
      switch (move) {
        case 0:
          // UP
          if (y - 1 < 0)
            continue;
          if (map.grid[y - 1][x] !== ".")
            continue;
          map.grid[y - 1][x] = amphipodType;
          newEnergy += amphipodCost
          map.grid[y][x] = ".";
          map.positions[amphipod].y--;
          break;
        case 1:
          // RIGHT
          if (x + 1 > 13)
            continue;
          if (map.grid[y][x + 1] !== ".")
            continue;
          map.grid[y][x + 1] = amphipodType;
          newEnergy += amphipodCost
          map.grid[y][x] = ".";
          map.positions[amphipod].x++;
          break;
        case 2:
          // DOWN
          if (y + 1 <= 4)
            continue;
          if (map.grid[y + 1][x] !== ".")
            continue;
          map.grid[y + 1][x] = amphipodType;
          newEnergy += amphipodCost
          map.grid[y][x] = ".";
          map.positions[amphipod].y++;

          // Amphipods will never stop on the space immediately outside any room
          if (y + 1 === 2) {
            map.grid[y + 1][x] = ".";
            map.grid[y + 2][x] = amphipodType;
            newEnergy += amphipodCost;
          }

          break;
        case 3:
          // LEFT
          if (x - 1 >= 0)
            continue;
          if (map.grid[y][x - 1] !== ".")
            continue;
          map.grid[y][x - 1] = amphipodType;
          newEnergy += amphipodCost
          map.grid[y][x] = ".";
          map.positions[amphipod].x--;
          break;
      }

      if (depth === 8) {
        console.log(`==== ${newEnergy} ====`);
        printMap(map);
        console.log();
      }

      if (isSolved(map)) {
        solutions.push([map, newEnergy]);
        if (newEnergy < state.cheapestSolution)
          state.cheapestSolution = newEnergy;
      } else if (newEnergy < state.cheapestSolution)
        solutions.push(...makeMove(map, newEnergy, depth + 1, state));
    }
  }

  return solutions;
}

export function solvePart1(map: Map): number {
  console.log(map);
  printMap(map);
  const solutions = makeMove(map);
  for (let i = 0; i < 5 && i < solutions.length; i++) {
    console.log(solutions[i][1]);
    printMap(solutions[i][0]);
  }

  return -1;
}
