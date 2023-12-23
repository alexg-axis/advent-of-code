import { BinaryHeap } from "https://deno.land/std@0.177.0/collections/binary_heap.ts";
import { Input } from "../../utils/deno/input.ts";

// Path, forest, slopes
type Cell = "." | "#" | "^" | "<" | ">" | "v";

function dijkstra(map: Cell[][], start: [number, number]) {
  const distances = new Map<string, number>();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== "#") {
        distances.set(`${x}:${y}`, Number.NEGATIVE_INFINITY);
      }
    }
  }
  distances.set(`${start[0]}:${start[1]}`, 0);

  const queue = new BinaryHeap<string>(
    (a, b) => distances.get(a)! - distances.get(b)!
  );
  queue.push(`${start[0]}:${start[1]}`);
  // for (let y = 0; y < map.length; y++) {
  //   for (let x = 0; x < map[y].length; x++) {
  //     if (map[y][x] !== "#") {
  //       queue.push(`${x}:${y}`);
  //     }
  //   }
  // }

  while (queue.length > 0) {
    const current = queue.pop()!;

    const [x, y] = current.split(":").map(Number);

    const currentCost = distances.get(current)!;
    console.log(x, y, currentCost);

    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx;
      const ny = y + dy;
      // Out of bounds
      if (nx < 0 || nx >= map[0].length || ny < 0 || ny >= map.length) {
        continue;
      }
      // Illegal - forest
      if (map[ny][nx] === "#") {
        continue;
      }
      // Illegal - not following slope
      if (map[y][x] === ">" && dx !== 1) {
        continue;
      }
      if (map[y][x] === "<" && dx !== -1) {
        continue;
      }
      if (map[y][x] === "v" && dy !== 1) {
        continue;
      }
      if (map[y][x] === "^" && dy !== -1) {
        continue;
      }
      // Illegal - upwards slope
      if (map[ny][nx] === ">" && dx === -1) {
        continue;
      }
      if (map[ny][nx] === "<" && dx === 1) {
        continue;
      }
      if (map[ny][nx] === "v" && dy === -1) {
        continue;
      }
      if (map[ny][nx] === "^" && dy === 1) {
        continue;
      }

      const next = `${nx}:${ny}`;

      const cost = currentCost + 1;
      if (cost < distances.get(next)!) {
        distances.set(next, cost);
        // queue.push(next);
      }
    }
  }

  return distances;
}

export function solvePart1(input: Input): number {
  const map = input.lines.map((x) => x.split("") as Cell[]);

  const start: [number, number] = [map[0].indexOf("."), 0];
  const goal: [number, number] = [
    map[map.length - 1].indexOf("."),
    map.length - 1,
  ];

  const distances = dijkstra(map, start);
  console.log(distances);

  return distances.get(`${goal[0]}:${goal[1]}`)!;
}
