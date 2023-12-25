import { combinations } from "https://deno.land/x/combinatorics@1.0.1/combinations.ts";
import { Input } from "../../utils/deno/input.ts";

function parseLine(line: string): [string, Set<string>] {
  const [left, right] = line.split(": ");
  return [left, new Set(right.split(" "))];
}

export function solvePart1(
  input: Input,
  snips: [string, string][] = [
    ["vph", "tjz"],
    ["pgt", "lnr"],
    ["jhq", "zkt"],
  ]
): number {
  const graph = new Map(input.lines.map(parseLine));

  // graphviz
  // pbpaste | sfdp -Tpdf -o test.pdf
  // console.log("strict graph {");
  // console.log("nodesep=2.0;");
  // for (const [k, v] of graph.entries()) {
  //   for (const o of v) {
  //     console.log(`  ${k} -- ${o}`);
  //   }
  // }
  // console.log("}");

  // vph - tjz
  // pgt - lnr
  // jhq - zkt

  for (const [k, v] of graph.entries()) {
    for (const o of v) {
      if (!graph.has(k)) {
        graph.set(k, new Set());
      }
      graph.get(k)!.add(o);

      if (!graph.has(o)) {
        graph.set(o, new Set());
      }
      graph.get(o)!.add(k);
    }
  }

  for (const [a, b] of snips) {
    graph.get(a)?.delete(b);
    graph.get(b)?.delete(a);
  }

  const clusterSize = (start: string): number => {
    const visited = new Set<string>();
    const queue = [start];
    while (queue.length > 0) {
      const current = queue.shift()!;
      visited.add(current);
      for (const next of Array.from(graph.get(current)!)) {
        if (!visited.has(next)) {
          queue.push(next);
        }
      }
    }
    return visited.size;
  };

  return clusterSize(snips[0][0]) * clusterSize(snips[0][1]);
}
