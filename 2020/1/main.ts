import input from "../../utils/deno/input.ts"

function solve(numbers: number[]): number | undefined {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i != j && numbers[i] + numbers[j] === 2020)
        return numbers[i] * numbers[j]
    }
  }
}

console.log(solve(input.numbers))
