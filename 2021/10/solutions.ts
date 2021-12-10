const scores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const openings = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
}

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
            score += scores[column];
      }
    }
  }

  return score;
}
