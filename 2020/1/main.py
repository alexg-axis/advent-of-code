from aoc import input

def solve(numbers: list[int]) -> int | None:
  for i in range(len(numbers)):
    for j in range(len(numbers)):
      if i != j and numbers[i] + numbers[j] == 2020:
        return numbers[i] * numbers[j]

def main():
  print(solve(input.ints))

if __name__ == "__main__":
  main()
