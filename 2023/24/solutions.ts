import { combinations } from "https://deno.land/x/combinatorics@1.0.1/combinations.ts";
import { Input } from "../../utils/deno/input.ts";

type Vec3 = [number, number, number];

interface Line {
  a: number;
  b: number;
  c: number;
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
  const x1 = record.position[0];
  const x2 = record.position[0] + record.velocity[0];

  const y1 = record.position[1];
  const y2 = record.position[1] + record.velocity[1];

  const a = y2 - y1;
  const b = x2 - x1;
  const c = x1 * y2 - x2 * y1;

  return {
    a: x1 > x2 ? -a : a,
    b,
    c,
  };
}

export function solvePart1(
  input: Input,
  min = 200000000000000,
  max = 400000000000000
): number {
  const records = input.lines.map(parseRecord);

  let intersections = 0;

  let nonParallel = 0;
  let nonOutOfBounds = 0;

  // Simple linear regressions
  for (const [recordA, recordB] of combinations(records, 2)) {
    // a1x+b1y+c1=0 and a2x+b2y+c2=0
    const left = line(recordA);
    const right = line(recordB);

    // console.log(recordA, recordB);

    // y = kx + m
    // check if k1 = k2
    if (-left.a / left.b === -right.a / right.b) {
      // Parallel
      // console.log("   parallel");
      // console.log();
      continue;
    }
    nonParallel++;

    // Intersection
    const x =
      (left.b * right.c - right.b * left.c) /
      (left.a * right.b - right.a * left.b);
    const y =
      (left.a * right.c - left.c * right.a) /
      (left.b * right.a - left.a * right.b);

    // Out of bounds
    if (x < min || x > max || y < min || y > max) {
      // console.log("   outside bounds", x, y);
      // console.log();
      continue;
    }
    nonOutOfBounds++;

    // In the past
    const leftT = (x - recordA.position[0]) / recordA.velocity[0];
    const rightT = (x - recordB.position[0]) / recordB.velocity[0];
    if (leftT < 0 || rightT < 0) {
      // console.log("   in the past");
      // console.log();
      continue;
    }

    console.log(left, right);
    console.log(x, y);

    // console.log(x, y);
    // console.log();

    intersections++;
  }

  console.log(nonParallel);
  console.log(nonOutOfBounds);
  console.log(intersections);

  return intersections;
}
