export function solvePart1(numbers: string[]): [number, number] {
  let gamma = "";
  let epsilon = "";

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
