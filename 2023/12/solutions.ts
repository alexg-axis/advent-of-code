import { permutations } from "https://deno.land/x/combinatorics@1.0.1/permutations.ts";
import { Input } from "../../utils/deno/input.ts";
import { combinations } from "https://deno.land/x/combinatorics@1.0.1/combinations.ts";

/**
 * - `.` operational.
 * - `#` damaged.
 * - `?` unknown.
 */
type Cell = "." | "#" | "?";

interface Report {
  cells: Cell[];
  runs: number[];
}

function parseReport(line: string): Report {
  const [cells, runs] = line.split(/ /g);
  return {
    cells: cells.split("") as Cell[],
    runs: runs.split(",").map(Number),
  };
}

function isValid(cells: Cell[], runs: number[]): boolean {
  const currentRuns: number[] = [];
  let runStart = -1;
  for (let i = 0; i < cells.length; i++) {
    if (runStart === -1 && cells[i] === "#") {
      runStart = i;
    } else if (runStart > -1 && cells[i] === ".") {
      currentRuns.push(i - runStart);
      runStart = -1;
    }
  }
  if (runStart > -1) {
    currentRuns.push(cells.length - runStart);
  }
  return currentRuns.join(",") === runs.join(",");
}

export function solvePart1(input: Input): number {
  const reports = input.lines.map(parseReport);

  let possibilites = 0;
  for (const report of reports) {
    const missingIndexes = new Array(report.cells.length)
      .fill(0)
      .map((_, i) => i)
      .filter((i) => report.cells[i] === "?");
    // All broken
    if (
      isValid(
        report.cells.map((x) => (x === "?" ? "#" : x)),
        report.runs
      )
    ) {
      possibilites++;
    }
    // All operational
    if (
      isValid(
        report.cells.map((x) => (x === "?" ? "." : x)),
        report.runs
      )
    ) {
      possibilites++;
    }
    // All other combinations
    for (let i = 1; i < missingIndexes.length; i++) {
      for (const combination of combinations(missingIndexes, i)) {
        const replaced = [...report.cells];
        for (let j = 0; j < combination.length; j++) {
          replaced[combination[j]] = ".";
        }
        for (let j = 0; j < replaced.length; j++) {
          if (replaced[j] === "?") {
            replaced[j] = "#";
          }
        }
        if (isValid(replaced, report.runs)) {
          possibilites++;
        }
      }
    }
  }

  return possibilites;
}
