export function solvePart1(input: number[]): number {
  let increases = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1])
      increases++;
  }
  return increases;
}

export function solvePart2(input: number[]): number {
  let increases = 0;
  for (let i = 3; i < input.length; i++) {
    const pastWindow = input.slice(i - 3, i).reduce((sum, x) => sum + x, 0);
    const currentWindow = input.slice(i - 2, i + 1).reduce((sum, x) => sum + x, 0);
    if (currentWindow > pastWindow)
      increases++;
  }
  return increases;
}
