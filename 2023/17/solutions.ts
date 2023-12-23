import { BinaryHeap } from "https://deno.land/std@0.177.0/collections/binary_heap.ts";
import { Input } from "../../utils/deno/input.ts";

interface State {
  position: [number, number];
  direction: [number, number];
  history: number;
}

const shifts = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function stateKey(state: State): string {
  return `${state.position.join(":")},${state.direction.join(":")},${
    state.history
  }`;
}

export function solvePart1(input: Input): number {
  const map = input.lines.map((x) => x.split("").map(Number));

  const start: State = { position: [0, 0], direction: [1, 0], history: 0 };

  const vertices = map
    .map((row, y) =>
      row.map((_, x) => {
        const result: State[] = [];
        for (const shift of shifts) {
          for (const consecutive of [0, 1, 2, 3]) {
            result.push({
              position: [x, y],
              direction: [...shift] as [number, number],
              history: consecutive,
            });
          }
        }
        return result;
      })
    )
    .flat(2);

  const distances = new Map(
    vertices.map((state) => [stateKey(state), Number.MAX_VALUE])
  );
  distances.set(stateKey(start), 0);

  const queue = new BinaryHeap<State>(
    (a, b) => distances.get(stateKey(a))! - distances.get(stateKey(b))!
  );
  for (const vertice of vertices) {
    queue.push(vertice);
  }

  while (queue.length > 0) {
    const current = queue.pop()!;

    const { position, direction, history } = current;

    const [x, y] = position;

    const currentCost = distances.get(stateKey(current))!;

    for (const [dx, dy] of shifts) {
      const nx = x + dx;
      const ny = y + dy;
      // Out of bounds
      if (nx < 0 || nx >= map[0].length || ny < 0 || ny >= map.length) {
        // console.log("  ", nx, ny, "out of bounds");
        continue;
      }
      // Illegal - too many straight moves
      if (dx === direction[0] && dy === direction[1] && history + 1 >= 3) {
        // console.log("  ", nx, ny, "too many straight moves");
        continue;
      }
      // Illegal - backwards
      if (
        (direction[0] !== 0 && direction[0] === -dx) ||
        (direction[1] !== 0 && direction[1] === -dy)
      ) {
        // console.log("  ", nx, ny, "backwards");
        continue;
      }

      const next: State = {
        position: [nx, ny],
        direction: [dx, dy],
        // Empty history when turning
        history: direction[0] === dx && direction[1] === dy ? history + 1 : 0,
      };
      const nextKey = stateKey(next);

      const cost = currentCost + map[ny][nx];

      if (cost < distances.get(nextKey)!) {
        distances.set(nextKey, cost);
        queue.push(next);
      }
    }
  }

  const goals: string[] = [];
  for (const shift of shifts) {
    for (const consecutive of [0, 1, 2, 3]) {
      goals.push(
        stateKey({
          position: [map[0].length - 1, map.length - 1],
          direction: [...shift] as [number, number],
          history: consecutive,
        })
      );
    }
  }

  let min = Number.MAX_VALUE;
  for (const goal of goals) {
    const steps = distances.get(goal)!;
    if (steps < min) {
      min = steps;
    }
  }

  return min;
}

export function solvePart2(input: Input): number {
  const map = input.lines.map((x) => x.split("").map(Number));

  const start: State = { position: [0, 0], direction: [1, 0], history: 0 };

  const vertices = map
    .map((row, y) =>
      row.map((_, x) => {
        const result: State[] = [];
        for (const shift of shifts) {
          for (const consecutive of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
            result.push({
              position: [x, y],
              direction: [...shift] as [number, number],
              history: consecutive,
            });
          }
        }
        return result;
      })
    )
    .flat(2);

  const distances = new Map(
    vertices.map((state) => [stateKey(state), Number.MAX_VALUE])
  );
  distances.set(stateKey(start), 0);

  const queue = new BinaryHeap<State>(
    (a, b) => distances.get(stateKey(a))! - distances.get(stateKey(b))!
  );
  for (const vertice of vertices) {
    queue.push(vertice);
  }

  while (queue.length > 0) {
    const current = queue.pop()!;

    const { position, direction, history } = current;

    const [x, y] = position;

    const currentCost = distances.get(stateKey(current))!;

    for (const [dx, dy] of shifts) {
      const nx = x + dx;
      const ny = y + dy;
      // Out of bounds
      if (nx < 0 || nx >= map[0].length || ny < 0 || ny >= map.length) {
        // console.log("  ", nx, ny, "out of bounds");
        continue;
      }
      // Illegal - too many straight moves
      if (dx === direction[0] && dy === direction[1] && history + 1 >= 10) {
        // console.log("  ", nx, ny, "too many straight moves");
        continue;
      }
      // Illegal - backwards
      if (
        (direction[0] !== 0 && direction[0] === -dx) ||
        (direction[1] !== 0 && direction[1] === -dy)
      ) {
        // console.log("  ", nx, ny, "backwards");
        continue;
      }
      // Illegal - too few in a row
      if (dx !== direction[0] && dy !== direction[1] && history + 1 < 4) {
        // console.log("  ", nx, ny, "not enough in a line");
        continue;
      }

      const next: State = {
        position: [nx, ny],
        direction: [dx, dy],
        // Empty history when turning
        history: direction[0] === dx && direction[1] === dy ? history + 1 : 0,
      };
      const nextKey = stateKey(next);

      const cost = currentCost + map[ny][nx];

      if (cost < distances.get(nextKey)!) {
        distances.set(nextKey, cost);
        queue.push(next);
      }
    }
  }
  // TODO: Try 4x skip tactic, but only use it for the path. Then extract the
  // actual path and count the actual cost- not missing anything
  // NOTE: Doesn't seem to work either...

  const goals: string[] = [];
  for (const shift of shifts) {
    for (const consecutive of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      goals.push(
        stateKey({
          position: [map[0].length - 1, map.length - 1],
          direction: [...shift] as [number, number],
          history: consecutive,
        })
      );
    }
  }

  let min = Number.MAX_VALUE;
  for (const goal of goals) {
    const steps = distances.get(goal)!;
    if (steps < min) {
      min = steps;
    }
  }

  return min;
}
