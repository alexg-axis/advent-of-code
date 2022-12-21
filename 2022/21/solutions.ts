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

type Node = number | string | [Node, Node, string];

function evaluate(node: Node, x: number): number {
  if (typeof node === "number") {
    return node;
  }

  if (typeof node === "string") {
    return x;
  }

  if (Array.isArray(node)) {
    switch (node[2]) {
      case "+":
        return evaluate(node[0], x) + evaluate(node[1], x);
      case "-":
        return evaluate(node[0], x) - evaluate(node[1], x);
      case "/":
        return evaluate(node[0], x) / evaluate(node[1], x);
      case "*":
        return evaluate(node[0], x) * evaluate(node[1], x);
    }
  }

  return -1;
}

function render(node: Node): string {
  if (typeof node === "number") {
    return node.toString();
  }

  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return `(${render(node[0])}) ${node[2]} (${render(node[1])})`;
  }

  return "";
}

export function solvePart2(input: Input): number {
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
  delete monkeys["humn"];

  const results: Record<string, Node> = Object.fromEntries(
    Object.entries(monkeys)
      .filter(([_, v]) => v.job.value !== undefined)
      .map(([k, v]) => [k, v.job.value!])
  );
  results["humn"] = "x";

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

    if (monkey.name === "root") {
      // This would be so much nicer with an actual solver, but laziness struck.
      // Basically, print the equation, feed it into a graph drawer like desmos,
      // find the approximate value, set the ranges in the loop and try them all
      console.log(
        render(results[monkey.job.lhs!]),
        "-",
        render(results[monkey.job.rhs!])
      );
      for (let i = 3.0067e12; i < 3.0068e12; i++) {
        if (
          evaluate(results[monkey.job.lhs!], i) ===
          evaluate(results[monkey.job.rhs!], i)
        ) {
          return i;
        }
      }
      return -1;
    }

    // Resolve the monkey
    const lhs = results[monkey.job.lhs!];
    const rhs = results[monkey.job.rhs!];
    let result: Node;
    if (typeof lhs === "number" && typeof rhs === "number") {
      switch (monkey.job.operation) {
        case "+":
          result = lhs + rhs;
          break;
        case "-":
          result = lhs - rhs;
          break;
        case "/":
          result = lhs / rhs;
          break;
        case "*":
          result = lhs * rhs;
          break;
      }
    } else {
      result = [lhs, rhs, monkey.job.operation!];
    }
    results[monkey.name] = result!;
    queue = queue.filter((x) => x !== monkey);
  }

  return -1;
}
