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

function countCardsRecursive(game: Card[], i: number, depth = 0): number {
  const matches = game[i].myNumbers.filter((x) =>
    game[i].winningNumbers.includes(x)
  );
  if (matches.length === 0) {
    return 1;
  }

  let cards = 1;
  for (let j = 0; j < matches.length; j++) {
    cards += countCardsRecursive(game, i + j + 1, depth + 1);
  }
  return cards;
}

export function solvePart2(input: Input): number {
  const game = parseGame(input);
  let cards = 0;
  for (let i = 0; i < game.length; i++) {
    cards += countCardsRecursive(game, i);
  }
  return cards;
}
