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

type Groups = {
  [key: number]: number;
}

export function solvePart2(numbers: number[]): number {
  // lifetime: count
  let groups: Groups = {};

  // Group input
  for (const number of numbers) {
    groups[number] = (groups[number] || 0) + 1;
  }

  // Simulate
  for (let i = 0; i < 256; i++) {
    const newGroups: Groups = {};
    const parents = groups[0] || 0;
    // Reduce lifetime of lanterfish
    for (let j = 1; j <= 8; j++) {
      newGroups[j - 1] = groups[j] || 0;
    }
    // Give birth to new lanterfish
    newGroups[8] = parents;
    // Move the parents to the six day lifecycle
    newGroups[6] = (newGroups[6] || 0 ) + parents;
    groups = newGroups;
  }

  const count = Object.values(groups).reduce((sum, x) => sum + x);
  return count;
}
