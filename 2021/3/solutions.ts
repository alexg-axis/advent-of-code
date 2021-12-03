function countBits(numbers: string[]): [number[], number[], number] {
  const width = numbers[0].length;

  const ones = new Array(width).fill(0);
  const zeroes = new Array(width).fill(0);

  for (const number of numbers) {
    for (let i = 0; i < width; i++) {
      if (number[i] == "1")
        ones[i]++;
      else
        zeroes[i]++;
    }
  }

  return [ones, zeroes, width];
}

export function solvePart1(numbers: string[]): [number, number] {
  let gamma = "";
  let epsilon = "";

  const [ones, zeroes, width] = countBits(numbers);

  for (let i = 0; i < width; i++) {
    if (ones[i] > zeroes[i]) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }

  return [Number.parseInt(gamma, 2), Number.parseInt(epsilon, 2)];
}

export function solvePart2(numbers: string[]): [number, number] {
  return [findValue(numbers, 1), findValue(numbers, 0)];
}

function findValue(numbers: string[], bit: number): number {
  const width = numbers[0].length;
  for (let i = 0; i < width; i++) {
    const [ones, zeroes, _] = countBits(numbers);
    if (ones[i] >= zeroes[i])
      numbers = numbers.filter(x => x[i] == bit.toString());
    else
      numbers = numbers.filter(x => x[i] == ((bit + 1) % 2).toString());

    if (numbers.length == 1)
      return Number.parseInt(numbers[0], 2);
  }

  return -1;
}
