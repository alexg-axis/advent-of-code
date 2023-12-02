import { Input } from "../../utils/deno/input.ts";

type Color = "red" | "blue" | "green";

interface Game {
  id: number;
  rounds: Round[];
}

interface Round {
  counts: Record<Color, number>;
}

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
function parseGame(line: string): Game {
  const [l, r] = line.split(": ");
  const id = Number(l.slice(5));
  const roundSets = r.split("; ");
  const rounds: Round[] = [];
  for (const roundSet of roundSets) {
    const counts: Record<Color, number> = {
      red: 0,
      blue: 0,
      green: 0,
    };
    const sets = roundSet.split(", ");
    for (const set of sets) {
      const [count, color] = set.split(" ");
      counts[color as Color] += Number(count);
    }
    rounds.push({ counts });
  }

  return { id, rounds };
}

function isPossible(game: Game): boolean {
  const max: Record<Color, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  for (const round of game.rounds) {
    for (const [color, count] of Object.entries(round.counts)) {
      if (count > max[color as Color]) {
        return false;
      }
    }
  }
  return true;
}

export function solvePart1(input: Input): number {
  return input.lines
    .map(parseGame)
    .filter(isPossible)
    .map((x) => x.id)
    .reduce((sum, x) => sum + x, 0);
}
