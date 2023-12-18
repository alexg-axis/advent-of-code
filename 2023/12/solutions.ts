import { Input } from "../../utils/deno/input.ts";
import { combinationsWithReplacement } from "https://deno.land/x/combinatorics@1.0.1/combinations_with_replacement.ts";

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

function isPossible(cells: string, runs: number[]): boolean {
  cells += ".";
  let run = 0;
  let passed = 0;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === "#") {
      passed++;
    } else if (cells[i] === ".") {
      if (passed > 0) {
        if (runs[run] !== passed) {
          // console.log("run mismatch", passed, run, runs[run]);
          return false;
        }
        run++;
        passed = 0;
      }
    } else {
      if (passed > runs[run]) {
        // console.log("run overrun");
        return false;
      }
      // ? - benefit of a doubt - could be possible
      return true;
    }
  }

  return run === runs.length;
}

function clean(cells: string): string {
  return cells.replace(/\.\.+/, ".").replace(/^\.+|\.+$/, "");
}

function solve(report: Report): number {
  const queue = [clean(report.cells)];
  let possible = 0;
  while (queue.length > 0) {
    const part = queue.shift()!;
    if (!isPossible(part, report.runs)) {
      // console.log(part, report.runs, "not possible");
      continue;
    }
    // console.log(part, report.runs, "possible");
    // console.log(part);

    const index = part.indexOf("?");
    if (index === -1) {
      possible++;
    } else {
      // console.log(part);
      // console.log(part.substring(0, index) + "." + part.substring(index + 1));
      // console.log(part.substring(0, index) + "#" + part.substring(index + 1));
      // console.log();
      queue.push(
        clean(part.substring(0, index) + "." + part.substring(index + 1)),
        clean(part.substring(0, index) + "#" + part.substring(index + 1))
      );
    }
  }
  // console.log(possible);
  // console.log();
  return possible;
}

export function solvePart1(input: Input): number {
  const reports = input.lines.map(parseReport);
  return reports.map(solve).reduce((sum, x) => sum + x);
}

export function solvePart2(input: Input): number {
  const reports = input.lines.map(parseReport).map(expand);
  return reports.map(solve).reduce((sum, x) => sum + x);
}
