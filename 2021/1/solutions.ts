export function solve(input: number[]): number {
  let increases = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1])
      increases++;
  }
  return increases;
}
