import { Input } from "../../utils/deno/input.ts";

export function solvePart1(input: Input): number {
  const history = input.lines.map((x) => x.split(/ +/).map(Number));
  let addedSum = 0;
  for (let i = 0; i < history.length; i++) {
    let current = [...history[i]];
    const last: number[] = [];
    for (let j = 0; j < history[i].length; j++) {
      const sum = current.reduce((sum, x) => sum + x, 0);
      if (sum === 0) {
        last.push(0);
        for (let k = last.length - 2; k >= 0; k--) {
          const value = last[k] + last[k + 1];
          last[k] = value;
        }
        addedSum += last[0];
        break;
      }

      last.push(current.slice(-1)[0]);
      const next: number[] = [];
      for (let k = 1; k < current.length; k++) {
        next.push(current[k] - current[k - 1]);
      }
      current = next;
    }
  }

  return addedSum;
}

export function solvePart2(input: Input): number {
  const history = input.lines.map((x) => x.split(/ +/).map(Number));
  let addedSum = 0;
  for (let i = 0; i < history.length; i++) {
    let current = [...history[i]];
    const first: number[] = [];
    for (let j = 0; j < history[i].length; j++) {
      const sum = current.reduce((sum, x) => sum + x, 0);
      if (sum === 0) {
        first.push(0);
        for (let k = first.length - 2; k >= 0; k--) {
          const value = -(first[k + 1] - first[k]);
          first[k] = value;
        }
        addedSum += first[0];
        break;
      }

      first.push(current[0]);
      const next: number[] = [];
      for (let k = 1; k < current.length; k++) {
        next.push(current[k] - current[k - 1]);
      }
      current = next;
    }
  }

  return addedSum;
}
