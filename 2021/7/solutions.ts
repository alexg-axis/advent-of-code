type CostFunction = (steps: number) => number;

function solve(numbers: number[], cost: CostFunction): number {
  const max = Math.max(...numbers);
  const totals = new Array<number>(max);
  for (let i = 0; i < max; i++) {
    const costs = new Array<number>(numbers.length);
    for (let j = 0; j < numbers.length; j++)
      costs[j] = cost(Math.abs(numbers[j] - (i + 1)));
    const total = costs.reduce((sum, x) => sum + x);
    totals[i] = total;
  }
  return Math.min(...totals);
}

export function solvePart1(numbers: number[]): number {
  return solve(numbers, x => x);
}

export function solvePart2(numbers: number[]): number {
  return solve(numbers, x => ((x + 1) * x) / 2);
}
