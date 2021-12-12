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
  const paths = findPaths(graph, []);
  return paths.length;
}

export function solvePart2(graph: Graph): number {
  const possibleSmall = graph.nodes.filter(x => x.small && x.label !== "start" && x.label !== "end").map(x => x.index);
  const allPaths = new Set<string>();
  for (const allowedSmall of possibleSmall) {
    const paths = findPaths(graph, [allowedSmall]).map(x => x.join(","));
    for (const path of paths)
      allPaths.add(path);
  }
  return allPaths.size;
}

function findPaths(graph: Graph, allowedSmall: number[]): string[][] {
  const visited: number[] = new Array(graph.length).fill(0);

  const startIndex = graph.map.indexOf("start");
  const endIndex = graph.map.indexOf("end");

  const paths: number[][] = [];
  recurse(graph, startIndex, endIndex, visited, [], paths, allowedSmall);

  return paths.map(x => x.map(y => graph.map[y]));
}

function recurse(graph: Graph, startIndex: number, endIndex: number, visited: number[], path: number[], paths: number[][], allowedSmall: number[]) {
  visited[startIndex]++;
  path.push(startIndex);

  if (startIndex === endIndex) {
    paths.push([...path]);
  } else {
    for (const adjacent of graph.nodes[startIndex].adjacent) {
      const isSmall = graph.nodes[adjacent].small;
      const shouldRecurse = (isSmall && visited[adjacent] === 0) || (isSmall && visited[adjacent] === 1 && allowedSmall.includes(adjacent)) || !isSmall;
      if (shouldRecurse)
        recurse(graph, adjacent, endIndex, visited, path, paths, allowedSmall);
    }
  }

  // Backtrack
  path.pop();
  visited[startIndex]--;
}
