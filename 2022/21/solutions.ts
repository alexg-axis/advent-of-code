import { Input } from "../../utils/deno/input.ts";

type Monkey = {
  name: string;
  job: {
    value?: number;
    lhs?: string;
    rhs?: string;
    operation?: string;
  };
};

export function solvePart1(input: Input): number {
  const monkeys: Record<string, Monkey> = Object.fromEntries(
    input.lines.map((x) => {
      const [name, action] = x.split(": ");
      const parts = action.split(" ");
      if (parts.length === 1) {
        return [name, { name, job: { value: Number(parts[0]) } }];
      } else {
        return [
          name,
          { name, job: { lhs: parts[0], rhs: parts[2], operation: parts[1] } },
        ];
      }
    })
  );

  const results: Record<string, number> = Object.fromEntries(
    Object.entries(monkeys)
      .filter(([_, v]) => v.job.value !== undefined)
      .map(([k, v]) => [k, v.job.value!])
  );

  let queue: Monkey[] = Object.values(monkeys).filter(
    (x) => x.job.value === undefined
  );

  while (true) {
    // Pick a monkey whose dependencies are complete
    const monkey = queue.find(
      (x) =>
        Object.hasOwn(results, x.job.lhs!) && Object.hasOwn(results, x.job.rhs!)
    );
    if (!monkey) {
      break;
    }

    // Resolve the monkey
    let result = 0;
    switch (monkey.job.operation) {
      case "+":
        result = results[monkey.job.lhs!] + results[monkey.job.rhs!];
        break;
      case "-":
        result = results[monkey.job.lhs!] - results[monkey.job.rhs!];
        break;
      case "*":
        result = results[monkey.job.lhs!] * results[monkey.job.rhs!];
        break;
      case "/":
        result = results[monkey.job.lhs!] / results[monkey.job.rhs!];
        break;
    }
    results[monkey.name] = result;
    queue = queue.filter((x) => x !== monkey);

    if (monkey.name === "root") {
      return results["root"];
    }
  }

  return -1;
}
