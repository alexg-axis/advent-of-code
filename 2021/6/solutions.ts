export function solvePart1(numbers: number[]): number {
  // naive way
  for (let i = 0; i < 80; i++) {
    const length = numbers.length;
    for (let j = 0; j < length; j++) {
      if (numbers[j] === 0) {
        numbers[j] = 6;
        numbers.push(8);
      } else {
        numbers[j]--;
      }
    }
  }

  return numbers.length;
}
