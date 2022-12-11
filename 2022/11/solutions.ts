import type { Input } from "../../utils/deno/input.ts";

type Operator = "+" | "-" | "*" | "/";

interface Monkey {
  items: number[];
  operation: [Operator, string];
  divisibleBy: number;
  positive: number;
  negative: number;
  inspections: number;
}

/*
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3
*/
function parseInput(input: Input): Monkey[] {
  const items = input.raw.split("\n\n");
  const result: Monkey[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i].split("\n");
    result[i] = {
      items: item[1]
        .match(/([0-9]+(, [0-9]+)*)$/)![0]
        .split(",")
        .map(Number),
      operation: item[2].match(/([-+*/]) (.*)$/)!.slice(1) as [
        Operator,
        string
      ],
      divisibleBy: Number(item[3].match(/divisible by ([0-9]+)$/)![1]),
      positive: Number(item[4].match(/monkey ([0-9]+)$/)![1]),
      negative: Number(item[5].match(/monkey ([0-9]+)$/)![1]),
      inspections: 0,
    };
  }
  return result;
}

function performOperation(
  old: number,
  operator: Operator,
  operand: string | number
): number {
  if (operand === "old") {
    operand = old;
  } else {
    operand = Number(operand);
  }

  switch (operator) {
    case "+":
      return old + operand;
    case "-":
      return old - operand;
    case "*":
      return old * operand;
    case "/":
      return old / operand;
  }
}

export function solvePart1(input: Input): number {
  const monkeys = parseInput(input);

  const evaluateMonkey = (monkey: Monkey) => {
    monkey.inspections++;
    // Pick up an item
    let worryLevel = monkey.items.shift()!;
    // Perform worry level operation
    worryLevel = performOperation(worryLevel, ...monkey.operation);
    // Monkey is bored, reduce worry level
    worryLevel = Math.floor(worryLevel / 3);
    if (worryLevel % monkey.divisibleBy === 0) {
      // console.log(`threw ${worryLevel} to ${monkey.positive}`);
      monkeys[monkey.positive].items.push(worryLevel);
    } else {
      // console.log(`threw ${worryLevel} to ${monkey.negative}`);
      monkeys[monkey.negative].items.push(worryLevel);
    }
  };

  for (let round = 0; round < 20; round++) {
    for (const monkey of monkeys) {
      while (monkey.items.length > 0) {
        evaluateMonkey(monkey);
      }
    }
    // console.log(`Round ${round + 1}`);
    // console.log(
    //   monkeys.map((x, i) => `Monkey ${i}: ` + x.items.join(", ")).join("\n")
    // );
  }

  const inspections = monkeys.map((x) => x.inspections).sort((a, b) => b - a);
  return inspections[0] * inspections[1];
}
