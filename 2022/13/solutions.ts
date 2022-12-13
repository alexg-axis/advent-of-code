import { Input } from "../../utils/deno/input.ts";
import { product, sum } from "../../utils/deno/arrays.ts";

type Packet = number | Packet[];
type Divisor = [[number]];

export function compare(a: Packet, b: Packet): number {
  if (typeof a === "number" && typeof b === "number") {
    return a - b === 0 ? 0 : (a - b) / Math.abs(a - b);
  } else if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if (i >= a.length) {
        return -1;
      } else if (i >= b.length) {
        return 1;
      }

      const comparison = compare(a[i], b[i]);
      if (comparison !== 0) {
        return comparison;
      }
    }
    return 0;
  } else if (Array.isArray(a)) {
    return compare(a, [b]);
  } else {
    return compare([a], b);
  }
}

function isDivisor(packet: Packet): boolean {
  return (
    Array.isArray(packet) &&
    packet.length === 1 &&
    Array.isArray(packet[0]) &&
    packet[0].length === 1 &&
    (packet[0][0] === 2 || packet[0][0] === 6)
  );
}

export function solvePart1(input: Input): number {
  const pairs = input.raw
    .trim()
    .split("\n\n")
    .map((x) => x.split("\n").map((y) => JSON.parse(y))) as unknown as [
    Packet,
    Packet
  ][];
  const correct: number[] = [];
  for (let i = 0; i < pairs.length; i++) {
    const comparison = compare(pairs[i][0], pairs[i][1]);
    if (comparison === -1) {
      correct.push(i + 1);
    }
  }

  return correct.reduce(sum);
}

export function solvePart2(input: Input): number {
  const packets = input.raw
    .trim()
    .split(/\n+/)
    .map((y) => JSON.parse(y)) as unknown as Packet[];
  packets.push([[2]], [[6]]);

  // Boy did it turn out I did the right choice here
  packets.sort(compare);

  const divisorIndices: number[] = [];
  for (let i = 0; i < packets.length; i++) {
    if (isDivisor(packets[i])) {
      divisorIndices.push(i + 1);
    }
  }

  return divisorIndices.reduce(product);
}
