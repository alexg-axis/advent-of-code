import { Input } from "../../utils/deno/input.ts";

type Node = [string, string];

type Graph = {
  moves: string;
  nodes: Record<string, Node>;
};

function parseGraph(input: Input): Graph {
  const moves = input.lines[0].trim();

  // AAA = (BBB, CCC)
  const entries: [string, Node][] = input.lines.slice(2).map((x) => {
    const [from, adjacent] = x.split(" = ");
    const [left, right] = adjacent.slice(1, -1).split(", ");
    return [from, [left, right]];
  });
  const nodes = Object.fromEntries(entries);

  return { moves, nodes };
}

export function solvePart1(input: Input): number {
  const graph = parseGraph(input);

  let currentNode = "AAA";
  for (let i = 0; i < 1e10; i++) {
    const move = graph.moves[i % graph.moves.length];
    currentNode = graph.nodes[currentNode][move === "L" ? 0 : 1];
    if (currentNode === "ZZZ") {
      return i + 1;
    }
  }

  return -1;
}
