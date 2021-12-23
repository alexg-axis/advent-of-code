import { permutations } from "https://deno.land/x/combinatorics/mod.ts";

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

const goals = ["A", "B", "C", "D"];

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
  return map.grid[2][3] === goals[0] && map.grid[3][3] === goals[0] &&
         map.grid[2][5] === goals[1] && map.grid[3][5] === goals[1] &&
         map.grid[2][7] === goals[2] && map.grid[3][7] === goals[2] &&
         map.grid[2][9] === goals[3] && map.grid[3][9] === goals[3];
}

function copyMap(map: Map): Map {
  return { grid: map.grid.map(x => [...x]), positions: map.positions.map(x => ({ ...x })) };
}

function serializeMap(map: Map): string {
  return map.grid.map(x => x.join("")).join("");
}

function makeMove(startMap: Map, energy = 0, depth = 0, state = { cheapestSolution: Number.MAX_VALUE, costs: {} as {[key: string]: number}}): [Map, number][] {
  if (depth > 38)
    return [];

  const solutions: [Map, number][] = [];
  // Test each amphipod
  for (let amphipod = 0; amphipod < 8; amphipod++) {
    const { x, y } = startMap.positions[amphipod];
    const amphipodType = startMap.grid[y][x];
    const amphipodCost = energies[amphipodType as keyof typeof energies];

    // The amphipod has already made it into the correct position, furthest down
    if (y === 3 && amphipodType === goals[(x - 3) / 2])
      continue;

    // The amphipod has already made it into the correct position, top slot
    if (y === 2 && amphipodType === goals[(x - 3) / 2] && startMap.grid[3][x] === amphipodType)
      continue;

    // Test each move
    for (let move = 0; move < 4; move++) {
      let newEnergy = energy;
      const map = copyMap(startMap);
      switch (move) {
        case 0:
          // UP

          // Illegal move
          if (y - 1 < 1)
            continue;
          if (map.grid[y - 1][x] !== ".")
            continue;

          // Move up
          map.grid[y][x] = ".";
          map.grid[y - 1][x] = amphipodType;
          map.positions[amphipod].y--;
          newEnergy += amphipodCost
          break;
        case 1:
          // RIGHT

          // Illegal move
          if (x + 1 > 11)
            continue;
          if (map.grid[y][x + 1] !== ".")
            continue;

          // Move right
          map.grid[y][x] = ".";
          map.grid[y][x + 1] = amphipodType;
          map.positions[amphipod].x++;
          newEnergy += amphipodCost
          break;
        case 2:
          // DOWN

          // Illegal move
          if (y + 1 > 3)
            continue;
          if (map.grid[y + 1][x] !== ".")
            continue;

          // Amphipods will never move into the incorrect room
          if (y === 1 && amphipodType !== goals[(x - 3) / 2])
            continue;

          // Amphipods will never move into a correct room where an incorrect amphipod is located
          if (y === 1 && map.grid[3][x] !== "." && map.grid[3][x] !== amphipodType)
            continue;

          // Move down
          map.grid[y][x] = ".";
          map.grid[y + 1][x] = amphipodType;
          map.positions[amphipod].y++;
          newEnergy += amphipodCost

          // Amphipods will never stop on the space immediately outside any room
          if (y === 1 && map.grid[3][x] === ".") {
            map.grid[2][x] = ".";
            map.grid[3][x] = amphipodType;
            map.positions[amphipod].y++;
            newEnergy += amphipodCost;
          }

          break;
        case 3:
          // LEFT

          // Illegal move
          if (x - 1 < 1)
            continue;
          if (map.grid[y][x - 1] !== ".")
            continue;

          // Move left
          map.grid[y][x] = ".";
          map.grid[y][x - 1] = amphipodType;
          map.positions[amphipod].x--;
          newEnergy += amphipodCost
          break;
      }

      // One move has to be made each iteration
      if (map.positions[amphipod].x === x && map.positions[amphipod].y === y)
        continue;

      // Solution found
      if (isSolved(map)) {
        console.log(`=== ${newEnergy} ===`);
        printMap(map);
        console.log();
        solutions.push([map, newEnergy]);
        if (newEnergy < state.cheapestSolution)
          state.cheapestSolution = newEnergy;
        continue
      }

      // Ignore branches where the cost is higher than the cheapest solution
      if (newEnergy > state.cheapestSolution)
        continue;

      // Ignore branches where the state has been achieved more cheaply
      const key = serializeMap(map);
      if (newEnergy < (state.costs[key] || Number.MAX_VALUE)) {
        state.costs[key] = newEnergy;
      } else
        continue;

      // Recurse
      solutions.push(...makeMove(map, newEnergy, depth + 1, state));
    }
  }

  return solutions;
}

export function solvePart1(map: Map): number {
  const start = performance.now();
  makeMove(map);
  console.log(performance.now() - start)

  return -1;
}
