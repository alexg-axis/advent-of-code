import { Input } from "../../utils/deno/input.ts";

type Node = {
  label: string,
  index: number,
  adjacent: number[],
  small: boolean,
};

type Graph = {
  nodes: Node[],
  map: string[],
  length: number,
}

export function parseInput(input: Input): Graph {
  const nodes: { [key: string]: Node } = {};
  const graph: Graph = {nodes: [], map: [], length: 0};

  for (const line of input.lines) {
    const [start, end] = line.split("-");
    const createNode = (label: string) => {
      graph.map.push(label);
      const node: Node = { label, index: graph.length, adjacent: [], small: label === label.toLowerCase() };
      graph.nodes.push(node);
      graph.length++;
      nodes[label] = node;
      return node;
    }

    if (!nodes[start]) createNode(start);
    if (!nodes[end]) createNode(end);

    nodes[start].adjacent.push(nodes[end].index);
    nodes[end].adjacent.push(nodes[start].index);
  }
  return graph;
}

export function solvePart1(graph: Graph): number {
  const paths = findPaths(graph);
  return paths.length;
}

function findPaths(graph: Graph): string[][] {
  const visited: boolean[] = new Array(graph.length).fill(false);

  const startIndex = graph.map.indexOf("start");
  const endIndex = graph.map.indexOf("end");

  const paths: number[][] = [];
  recurse(graph, startIndex, endIndex, visited, [], paths);

  return paths.map(x => x.map(y => graph.map[y]));
}

function recurse(graph: Graph, startIndex: number, endIndex: number, visited: boolean[], path: number[], paths: number[][]) {
  visited[startIndex] = true;
  path.push(startIndex);

  if (startIndex === endIndex) {
    paths.push([...path]);
  } else {
    for (const adjacent of graph.nodes[startIndex].adjacent) {
      const isSmall = graph.nodes[adjacent].small;
      const shouldRecurse = (isSmall && !visited[adjacent]) || !isSmall;
      if (shouldRecurse)
        recurse(graph, adjacent, endIndex, visited, path, paths);
    }
  }

  // Backtrach
  path.pop();
  visited[startIndex] = false;
}
