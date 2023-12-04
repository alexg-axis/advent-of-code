import { Input } from "../../utils/deno/input.ts";

interface Card {
  winningNumbers: number[];
  myNumbers: number[];
}

// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
function parseGame(input: Input): Card[] {
  return input.lines.map((x) => {
    const [winningNumbers, myNumbers] = x
      .split(/: +/)[1]
      .split(/ +\| +/)
      .map((x) => x.split(/ +/).map(Number));
    return { winningNumbers, myNumbers };
  });
}

export function solvePart1(input: Input): number {
  const game = parseGame(input);
  let score = 0;

  for (const card of game) {
    const matches = card.myNumbers.filter((x) =>
      card.winningNumbers.includes(x)
    );
    if (matches.length > 0) {
      score += Math.pow(2, matches.length - 1);
    }
  }

  return score;
}
