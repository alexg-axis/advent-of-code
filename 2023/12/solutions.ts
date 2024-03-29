import { Input } from "../../utils/deno/input.ts";

interface Report {
  cells: string;
  runs: number[];
}

function parseReport(line: string): Report {
  const [cells, runs] = line.split(/ /g);
  return {
    cells,
    runs: runs.split(",").map(Number),
  };
}

function expand(report: Report): Report {
  return {
    cells: new Array(5).fill(report.cells).join("?"),
    runs: new Array(5).fill(report.runs).flat(),
  };
}

const cache = new Map<string, number>();

// ?????#.?##?????.??? 5,2,1,1,1
function solve(cells: string, runs: number[], past = 0): number {
  const key = `${cells}:${runs.join(",")}:${past}`;
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  // Done
  if (cells.length === 0) {
    const value = runs.length === 0 ? 1 : 0;
    cache.set(key, value);
    return value;
  }

  if (cells[0] === "#") {
    if (past + 1 > runs[0]) {
      // Overrun
      const value = 0;
      cache.set(key, value);
      return value;
    } else {
      // Continue run
      const value = solve(cells.substring(1), runs, past + 1);
      cache.set(key, value);
      return value;
    }
  }

  if (cells[0] === ".") {
    // Finish run
    if (past > 0) {
      if (runs[0] !== past) {
        // Run mismatch
        const value = 0;
        cache.set(key, value);
        return value;
      }

      // Move on to next run
      const value = solve(cells.substring(1), runs.slice(1), 0);
      cache.set(key, value);
      return value;
    }

    // Continue empty
    const value = solve(cells.substring(1), runs, 0);
    cache.set(key, value);
    return value;
  }

  // Branch possibilities
  let value = solve("." + cells.substring(1), runs, past);
  // Branch won't overrun current run
  if (past < runs[0]) {
    value += solve("#" + cells.substring(1), runs, past);
  }
  cache.set(key, value);
  return value;
}

export function solvePart1(input: Input): number {
  const reports = input.lines.map(parseReport);
  return reports
    .map((report) => solve(report.cells + ".", report.runs))
    .reduce((sum, x) => sum + x);
}

export function solvePart2(input: Input): number {
  const reports = input.lines.map(parseReport).map(expand);
  return reports
    .map((report) => solve(report.cells + ".", report.runs))
    .reduce((sum, x) => sum + x);
}
