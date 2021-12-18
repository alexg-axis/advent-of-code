import { Input } from "../../utils/deno/input.ts";

type Pair = [number | Pair, number | Pair];

enum NodeType {
  INCREMENT = "[",
  DECREMENT = "]",
  DELIMITER = ",",
  NUMBER = "int",
}

type Node = {
  type: NodeType,
  value?: number,
};

type Map = Node[];

export function parseInput(input: Input): Map[] {
  const maps: Map[] = [];
  for (const line of input.lines) {
    const map: Map = [];
    for (let i = 0; i < line.length; i++) {
      if (line[i] === NodeType.INCREMENT)
        map.push({ type: NodeType.INCREMENT });
      else if (line[i] === NodeType.DECREMENT)
        map.push({ type: NodeType.DECREMENT });
      else if (line[i] === NodeType.DELIMITER)
        map.push({ type: NodeType.DELIMITER });
      else {
        let number = "";
        for (let j = i; j < line.length && /[0-9]/.test(line[j]); j++)
          number += line[j];
        i += number.length - 1;
        map.push({ type: NodeType.NUMBER, value: Number(number) });
      }
    }
    maps.push(map);
  }
  return maps;
}

export function sum(a: Map, b: Map): Map {
  const result: Map = [{ type: NodeType.INCREMENT }, ...a, { type: NodeType.DELIMITER }, ...b, { type: NodeType.DECREMENT }];
  return result;
}

export function reduce(x: Map) {
  while (explode(x) || split(x));
}

export function explode(x: Map): boolean {
  let depth = 0;

  for (let i = 0; i < x.length; i++) {
    const node = x[i];
    if (depth > 4 && node.type === NodeType.NUMBER) {
      const start = i - 1;

      const left = x[i];

      // Add left
      for (let j = i - 1; j >= 0; j--) {
        const other = x[j];
        if (other.type === NodeType.NUMBER) {
          other.value = left.value! + other.value!;
          break;
        }
      }

      // Skip left and delimiter
      i += 2;
      const right = x[i];

      // Add right
      for (let j = i + 1; j < x.length; j++) {
        const other = x[j];
        if (other.type === NodeType.NUMBER) {
          other.value = right.value! + other.value!;
          break;
        }
      }

      // Replace pair with 0
      x.splice(start, 5, {type: NodeType.NUMBER, value: 0});

      return true;
    }

    if (node.type === NodeType.INCREMENT)
      depth++;
    else if (node.type === NodeType.DECREMENT)
      depth--;
  }

  return false;
}

export function split(x: Map): boolean {
  for (let i = 0; i < x.length; i++) {
    const node = x[i];
    if (node.type === NodeType.NUMBER && node.value! >= 10) {
      const replacement = [
        { type: NodeType.INCREMENT },
        { type: NodeType.NUMBER, value: Math.floor(node.value! / 2) },
        { type: NodeType.DELIMITER },
        { type: NodeType.NUMBER, value: Math.round(node.value! / 2) },
        { type: NodeType.DECREMENT },
      ];
      x.splice(i, 1, ...replacement);
      return true;
    }
  }

  return false;
}

export function formatMap(x: Map): string {
  let result = "";
  for (const {type, value} of x) {
    if (type === NodeType.NUMBER)
      result += value;
    else
      result += type;
  }
  return result;
}

export function sumReduce(input: Map[]): Map {
  for (let i = 0; i < input.length - 1; i++) {
    input[i + 1] = sum(input[i], input[i + 1]);
    reduce(input[i + 1]);
  }
  return input[input.length - 1];
}

export function magnitude([a, b]: Pair): number {
  return 3 * (typeof a === "number" ? a : magnitude(a as Pair)) + 2 * (typeof b === "number" ? b : magnitude(b as Pair));
}

export function solvePart1(input: Map[]): number {
  const finalSum = sumReduce(input);
  // console.log(formatMap(finalSum));
  return magnitude(JSON.parse(formatMap(finalSum)) as Pair);
}
