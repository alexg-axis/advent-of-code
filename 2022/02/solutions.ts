import type { Input } from "../../utils/deno/input.ts";

const enum Move {
  Rock,
  Paper,
  Scissors,
}

const choices: Record<string, Move> = {
  X: Move.Rock,
  Y: Move.Paper,
  Z: Move.Scissors,
  A: Move.Rock,
  B: Move.Paper,
  C: Move.Scissors,
};

const scores: Record<Move, number> = {
  [Move.Rock]: 1,
  [Move.Paper]: 2,
  [Move.Scissors]: 3,
};

function parseInput(input: Input): [Move, Move][] {
  return input.lines.map(
    (x) => x.split(" ").map((x) => choices[x]) as [Move, Move]
  );
}

export function solvePart1(input: Input): number {
  let score = 0;
  const moves = parseInput(input);
  for (const [other, mine] of moves) {
    if (other === mine) {
      score += scores[mine] + 3;
    } else if (other === Move.Rock && mine === Move.Paper) {
      score += scores[mine] + 6;
    } else if (other === Move.Paper && mine === Move.Scissors) {
      score += scores[mine] + 6;
    } else if (other == Move.Scissors && mine === Move.Rock) {
      score += scores[mine] + 6;
    } else {
      score += scores[mine];
    }
  }
  return score;
}
