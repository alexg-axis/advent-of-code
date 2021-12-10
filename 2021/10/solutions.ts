const syntaxScores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const completionScores = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const openings = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const closings = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

export function solvePart1(rows: string[][]): number {
  let score = 0;
  for (const row of rows) {
    const open: string[] = [];

    for (const column of row) {
      switch (column) {
        case "(":
        case "[":
        case "{":
        case "<":
          open.push(column);
          break;
        case ")":
        case "]":
        case "}":
        case ">":
          if (open.pop() !== openings[column])
            score += syntaxScores[column];
      }
    }
  }

  return score;
}

export function solvePart2(rows: string[][]): number {
  const scores: number[] = [];
nextRow:
  for (const row of rows) {
    const open: string[] = [];

    for (const column of row) {
      switch (column) {
        case "(":
        case "[":
        case "{":
        case "<":
          open.push(column);
          break;
        case ")":
        case "]":
        case "}":
        case ">":
          if (open.pop() !== openings[column])
            continue nextRow;
      }
    }

    const completionString = open.reverse().map(x => closings[x as keyof typeof closings]);
    scores.push(completionString.reduce((score, x) => score * 5 + completionScores[x as keyof typeof completionScores], 0));
  }

  scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}
