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

const cache: Record<string, number> = {};

// ?????#.?##?????.??? 5,2,1,1,1
function solve(cells: string, runs: number[], past = 0): number {
  const key = `${cells}:${runs.join(",")}:${past}`;
  if (cache[key]) {
    return cache[key];
  }

  // Done
  if (cells.length === 0) {
    cache[key] = runs.length === 0 ? 1 : 0;
    return cache[key];
  }

  if (cells[0] === "#") {
    if (past + 1 > runs[0]) {
      // Overrun
      cache[key] = 0;
      return cache[key];
    } else {
      // Continue run
      cache[key] = solve(cells.substring(1), runs, past + 1);
      return cache[key];
    }
  }

  if (cells[0] === ".") {
    // Finish run
    if (past > 0) {
      if (runs[0] !== past) {
        // Run mismatch
        cache[key] = 0;
        return cache[key];
      }

      // Move on to next run
      cache[key] = solve(cells.substring(1), runs.slice(1), 0);
      return cache[key];
    }

    // Continue empty
    cache[key] = solve(cells.substring(1), runs, 0);
    return cache[key];
  }

  // Branch possibilities
  let x = solve("." + cells.substring(1), runs, past);
  if (past < runs[0]) {
    x += solve("#" + cells.substring(1), runs, past);
  }
  cache[key] = x;
  return cache[key];
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
    .map((report, i) => {
      console.log(i);
      return solve(report.cells + ".", report.runs);
    })
    .reduce((sum, x) => sum + x);
}
