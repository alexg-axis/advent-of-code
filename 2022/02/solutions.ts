import type { Input } from "../../utils/deno/input.ts";

const enum Move {
  Rock,
  Paper,
  Scissors,
}

const enum Ending {
  Lose,
  Draw,
  Win,
}

const moves: Record<string, Move> = {
  X: Move.Rock,
  Y: Move.Paper,
  Z: Move.Scissors,
  A: Move.Rock,
  B: Move.Paper,
  C: Move.Scissors,
};

const endings: Record<string, Ending> = {
  X: Ending.Lose,
  Y: Ending.Draw,
  Z: Ending.Win,
};

const scores: Record<Move, number> = {
  [Move.Rock]: 1,
  [Move.Paper]: 2,
  [Move.Scissors]: 3,
};

export function parseInput(input: Input): [Move, Move, Ending][] {
  return input.lines.map((x) => {
    const [a, b] = x.split(" ");
    return [moves[a], moves[b], endings[b]] as unknown as [Move, Move, Ending];
  });
}

function calculateScore(other: Move, mine: Move): number {
  if (other === mine) {
    return scores[mine] + 3;
  } else if (other === Move.Rock && mine === Move.Paper) {
    return scores[mine] + 6;
  } else if (other === Move.Paper && mine === Move.Scissors) {
    return scores[mine] + 6;
  } else if (other == Move.Scissors && mine === Move.Rock) {
    return scores[mine] + 6;
  } else {
    return scores[mine];
  }
}

export function solvePart1(input: Input): number {
  const moves = parseInput(input);
  return moves.reduce(
    (score, [other, mine]) => score + calculateScore(other, mine),
    0
  );
}

export function solvePart2(input: Input): number {
  let score = 0;
  const moves = parseInput(input);
  for (const [other, _, ending] of moves) {
    let mine: Move | undefined;

    if (ending === Ending.Lose) {
      if (other === Move.Rock) {
        mine = Move.Scissors;
      } else if (other === Move.Paper) {
        mine = Move.Rock;
      } else if (other === Move.Scissors) {
        mine = Move.Paper;
      }
    } else if (ending === Ending.Draw) {
      mine = other;
    } else if (ending === Ending.Win) {
      if (other === Move.Rock) {
        mine = Move.Paper;
      } else if (other === Move.Paper) {
        mine = Move.Scissors;
      } else if (other === Move.Scissors) {
        mine = Move.Rock;
      }
    }

    score += calculateScore(other, mine!);
  }
  return score;
}
