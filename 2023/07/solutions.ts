import { Input } from "../../utils/deno/input.ts";

type Card =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

const Cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

type Hand = { cards: Card[]; bid: number };

function calculateStrength(hand: Hand): number {
  const unique = Array.from(new Set(hand.cards));
  // Five of a type
  if (unique.length === 1) {
    return 7;
  }

  if (unique.length === 2) {
    const aLength = hand.cards.filter((x) => x === unique[0]).length;
    const bLength = hand.cards.filter((x) => x === unique[1]).length;

    // Four of a type
    if (aLength === 4 || bLength === 4) {
      return 6;
    }

    // Full house
    if (aLength === 3 || bLength === 3) {
      return 5;
    }
  }

  if (unique.length === 3) {
    const aLength = hand.cards.filter((x) => x === unique[0]).length;
    const bLength = hand.cards.filter((x) => x === unique[1]).length;
    const cLength = hand.cards.filter((x) => x === unique[2]).length;

    // Three of a kind
    if (aLength === 3 || bLength === 3 || cLength === 3) {
      return 4;
    }

    // Two pair
    if (
      (aLength === 2 && (bLength === 2 || cLength === 2)) ||
      (bLength === 2 && (aLength === 2 || cLength === 2)) ||
      (cLength === 2 && (bLength === 2 || aLength === 2))
    ) {
      return 3;
    }
  }

  // High card
  if (unique.length === 5) {
    return 1;
  }

  // One pair
  return 2;
}

function sortByStrength(a: Hand, b: Hand): number {
  const aStrength = calculateStrength(a);
  const bStrength = calculateStrength(b);
  const diff = bStrength - aStrength;
  if (diff === 0) {
    for (let i = 0; i < a.cards.length; i++) {
      const aIndex = Cards.indexOf(a.cards[i]);
      const bIndex = Cards.indexOf(b.cards[i]);
      if (aIndex !== bIndex) {
        return aIndex - bIndex;
      }
    }
  }

  return diff;
}

export function solvePart1(input: Input): number {
  const hands: Hand[] = input.lines.map((x) => {
    const [cards, bid] = x.split(" ");
    return { cards: cards.split("") as Card[], bid: Number(bid) };
  });

  hands.sort(sortByStrength);

  // console.log(hands.map((x) => ({ ...x, strength: calculateStrength(x) })));

  let score = 0;
  for (let i = 0; i < hands.length; i++) {
    const rank = hands.length - i;
    score += hands[i].bid * rank;
  }

  return score;
}
