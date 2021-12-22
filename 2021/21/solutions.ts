import {  permutationsWithReplacement } from "https://deno.land/x/combinatorics/mod.ts";

import { Input } from "../../utils/deno/input.ts";

type Tuple = [number, number];

export function parseInput(input: Input): Tuple {
  // zero-indexed slots, hence -1
  return [Number(input.lines[0][28]) - 1, Number(input.lines[1][28]) - 1];
}

export function solvePart1(positions: Tuple): number {
  let die = 0;
  let rolls = 0;
  let currentPlayer = 0;
  const scores = new Array(positions.length).fill(0);

  while (true) {
    let spaces = 0;
    for (let i = 0; i < 3; i++) {
      spaces += die + 1;
      die = (die + 1) % 100;
      rolls++;
    }
    positions[currentPlayer] = (positions[currentPlayer] + spaces) % 10;
    scores[currentPlayer] += positions[currentPlayer] + 1;
    if (scores[currentPlayer] >= 1000)
      break;
    currentPlayer = (currentPlayer + 1) % positions.length;
  }

  return scores[(currentPlayer + 1) % positions.length] * rolls;
}

const cache: {[key: string]: Tuple} = {};
function roll(startPositions: Tuple, scores: Tuple = [0, 0]): Tuple {
  const key = [...startPositions, ...scores].join(";");
  if (cache[key])
    return cache[key];

  const possibleRolls = [1, 2, 3];
  let wins: Tuple = [0, 0];
  for (const player1Rolls of permutationsWithReplacement(possibleRolls, 3)) {
    for (const player2Rolls of permutationsWithReplacement(possibleRolls, 3)) {
      const newPositions: Tuple = [
        (startPositions[0] + player1Rolls.reduce((sum, x) => sum + x)) % 10,
        (startPositions[1] + player2Rolls.reduce((sum, x) => sum + x)) % 10,
      ];

      const newScores = newPositions.map((x, i) => x + 1 + scores[i]) as Tuple;
      if (newScores[0] >= 21) {
        wins[0]++;
        cache[key] = wins;
        continue;
      }

      if (newScores[1] >= 21) {
        wins[1]++;
        cache[key] = wins;
        continue;
      }

      wins = roll(newPositions, newScores).map((x, i) => x + wins[i]) as Tuple;
    }
  }

  return wins;
}

export function solvePart2(startPositions: Tuple): number {
  // roll 1            1                      2                    3
  // roll 2     1      2      3        1      2      3      1      2      3
  // roll 3   1 2 3  1 2 3  1 2 3    1 2 3  1 2 3  1 2 3  1 2 3  1 2 3  1 2 3
  // Combinations:
  // 121 === 211 === 112
  // 321 === 123 === 213
  // 3 to choose from each roll of three, resulting in 27 combinations
  // 111, 112, 121, 122, 211 ...
  // These may produce the same sum
  // 1+1+1 + 1+1+2 = 1+2+1 = 3
  // 1 1 1, 1 1 2, 1 1 3,
  // Possible sums are 3, 4, 5, 6, 7, 8, 9, meaning there are only 7 sums for
  // three rolls
  // So the number of possible rolls are based on permutations with replacement
  // of these 7 sums
  // roll 1,2,3                                                     3
  // roll 4,5,6        3              4              5              6              7              8              9
  // roll 7,8,9  3 4 5 6 7 8 9  3 4 5 6 7 8 9  3 4 5 6 7 8 9  3 4 5 6 7 8 9  3 4 5 6 7 8 9  3 4 5 6 7 8 9  3 4 5 6 7 8 9

  const start = performance.now();

  const wins = roll(startPositions);

  console.log((performance.now() - start) / 1000);

  return Math.min(...wins);
}
