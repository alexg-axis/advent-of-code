import { combinations } from "https://deno.land/x/combinatorics@1.0.1/combinations.ts";
import { Input } from "../../utils/deno/input.ts";

type Vec3 = [number, number, number];

interface Line {
  k: number;
  y0: number;
}

interface Record {
  position: Vec3;
  velocity: Vec3;
}

// 19, 13, 30 @ -2,  1, -2
function parseRecord(line: string): Record {
  const [px, py, pz, vx, vy, vz] = line.match(/-?\d+/g)!.map(Number);
  return {
    position: [px, py, pz],
    velocity: [vx, vy, vz],
  };
}

function line(record: Record): Line {
  // Incline of the line
  const k = record.velocity[1] / record.velocity[0];
  // y where x=0
  const y0 = record.position[1] - k * record.position[0];
  return {
    k,
    y0,
  };
}

export function solvePart1(
  input: Input,
  min = 200000000000000,
  max = 400000000000000
): number {
  const records = input.lines.map(parseRecord);

  let intersections = 0;

  // Simple linear regressions
  for (const [recordA, recordB] of combinations(records, 2)) {
    const left = line(recordA);
    const right = line(recordB);

    // console.log(recordA, recordB);

    if (left.k === right.k) {
      // Parallel
      // console.log("   parallel");
      // console.log();
      continue;
    }

    // Intersection
    const x = (right.y0 - left.y0) / (left.k - right.k);
    // kx+m
    const y = left.k * x + left.y0;

    // Out of bounds
    if (x < min || x > max || y < min || y > max) {
      // console.log("   outside bounds", x, y);
      // console.log();
      continue;
    }

    // In the past
    const leftT = (x - recordA.position[0]) / recordA.velocity[0];
    const rightT = (x - recordB.position[0]) / recordB.velocity[0];
    if (leftT < 0 || rightT < 0) {
      // console.log("   in the past");
      // console.log();
      continue;
    }

    // console.log(recordA, recordB);
    // console.log(x, y);
    // console.log();
    intersections++;
  }

  return intersections;
}
