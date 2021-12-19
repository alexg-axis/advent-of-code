import { Input } from "../../utils/deno/input.ts";

// Z is up, X right, Y forward
type Vector3 = {
  x: number,
  y: number,
  z: number,
  sensor?: number,
};

export function parseInput(input: Input): Vector3[][] {
  return input.raw.trim().split(/--- scanner [0-9]+ ---/).filter(x => x.length > 0).map(scanner => scanner.trim().split("\n").map(coordinate => {
    const [x, y, z] = coordinate.split(",").map(Number);
    return {x, y, z};
  }));
}

function rotate(input: Vector3, i: number): Vector3 {
  // See https://www.euclideanspace.com/maths/discrete/groups/categorise/finite/cube/index.htm
  const lookup = [
    "", "x", "y", "xx",
    "xy", "yx", "yy", "xxx",
    "xxy", "xyx", "xyy", "yxx",
    "yyx", "yyy", "xxxy", "xxyx",
    "xxyy", "xyxx", "xyyy", "yxxx",
    "yyyx", "xxxyx", "xyxxx", "xyyyx",
  ]

  const rotateX = ({x, y, z}: Vector3) => ({x: x, y: -z, z: y});
  const rotateY = ({x, y, z}: Vector3) => ({x: z, y: y, z: -x});

  const rotations = lookup[i];
  let vector = {x: input.x, y: input.y, z: input.z};
  for (const rotation of rotations.split(""))
    vector = rotation === "x" ? rotateX(vector) : rotateY(vector);
  return vector;
}

// subtract
function subtract(a: Vector3, b: Vector3): Vector3 {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
  };
}

function add(a: Vector3, b: Vector3): Vector3 {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z,
  };
}

function manhattan(a: Vector3, b: Vector3): number {
  return Math.abs(b.x - a.x) + Math.abs(b.y - a.y) + Math.abs(b.z - a.z);
}

function equal(a: Vector3[], b: Vector3[]): number {
  let count = 0;
  for (const {x: ax, y: ay, z: az} of a) {
    for (const {x: bx, y: by, z: bz} of b) {
      if (ax === bx && ay === by && az === bz) {
        count++;
        break;
      }
    }
  }

  return count;
}

function align(fixed: Vector3[], vectors: Vector3[]): [Vector3[], Vector3, number?] | null {
  // Loop over all possible orientations
  for (let j = 0; j < 24; j++) {
    // Rotation to test
    const rotatedVectors = vectors.map(x => rotate(x, j));
    // Test offsets by assuming the compared points are equal. Targets are
    // from the previous scanner, thus known good
    for (const target of fixed) {
      for (const source of rotatedVectors) {
        const offset = subtract(target, source);
        const offsetAndRotatedVectors = rotatedVectors.map(x => add(x, offset));
        if (equal(fixed, offsetAndRotatedVectors) >= 12)
          return [offsetAndRotatedVectors, offset, source.sensor];
      }
    }
  }

  return null;
}

export function solvePart1(input: Vector3[][]): number {
  // The first sensor is fixed, meaning it will constitute the source truth
  // regarding the coordinate system
  const fixed = input[0];
  // Iteratively try to align each sensor to some known good pointes from fixed
  const sensorsToAlign = input.slice(1);
  while (sensorsToAlign.length > 0) {
    const sensor = sensorsToAlign.shift()!;
    const result = align(fixed, sensor);
    if (result)
      fixed.push(...result[0])
    else
      sensorsToAlign.push(sensor);
  }

  const counts: {[key: string]: number} = {};
  for (const {x, y, z} of fixed.flat(2)) {
    const key = `${x};${y};${z}`;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.values(counts).filter(x => x >= 1).length;
}

export function solvePart2(input: Vector3[][]): number {
  // Map each input vector to its originating sensor
  input = input.map((x, i) => x.map(y => ({...y, sensor: i})));

  const fixed = input[0];
  // Solved coordinates. All zero untill solved
  const coordinates: Vector3[] = input.map(_ => ({x: 0, y: 0, z: 0}));
  const sensorsToAlign = input.slice(1);
  while (sensorsToAlign.length > 0) {
    const sensor = sensorsToAlign.shift()!;
    const result = align(fixed, sensor);
    if (result) {
      // Add the solved offset to the sensor it matched to
      const [aligned, offset] = result;
      coordinates[sensor[0].sensor!] = add(coordinates[0!], offset);
      fixed.push(...aligned);

    } else
      sensorsToAlign.push(sensor);
  }

  let maxDistance = 0;
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = 0; j < coordinates.length; j++) {
      if (i === j)
        continue;

      const distance = manhattan(coordinates[i], coordinates[j]);
      if (distance > maxDistance)
        maxDistance = distance;
    }
  }

  return maxDistance;
}
