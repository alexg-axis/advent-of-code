import { Input } from "../../utils/deno/input.ts";

interface State {
  position: [number, number];
  direction: [number, number];
  history: [number, number];
}

const shifts = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function stateKey(state: State): string {
  return `${state.position.join(":")},${state.direction.join(
    ":"
  )},${state.history.join(":")}`;
}

export function solvePart1(input: Input): number {
  const map = input.lines.map((x) => x.split("").map(Number));

  const start: State = { position: [0, 0], direction: [1, 0], history: [0, 0] };

  const vertices = map
    .map((row, y) =>
      row.map((_, x) => {
        const result: State[] = [];
        for (const shift of shifts) {
          for (let i = 0; i < 2; i++) {
            for (const consecutive of [0, 1, 2, 3]) {
              const history: [number, number] = [0, 0];
              history[i] = consecutive;
              result.push({
                position: [x, y],
                direction: [...shift] as [number, number],
                history,
              });
            }
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

  const queue: State[] = [...vertices];
  while (queue.length > 0) {
    console.log(queue.length / vertices.length);
    const current = queue
      .sort((a, b) => distances.get(stateKey(a))! - distances.get(stateKey(b))!)
      .shift()!;

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
      if (Math.abs(history[0] + dx) >= 3 || Math.abs(history[1] + dy) >= 3) {
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
        history:
          direction[0] === dx && direction[1] === dy
            ? [history[0] + dx, history[1] + dy]
            : [0, 0],
      };
      const nextKey = stateKey(next);

      const cost = currentCost + map[ny][nx];

      if (cost < distances.get(nextKey)!) {
        distances.set(nextKey, cost);
      }
    }
  }

  const goals: string[] = [];
  for (const shift of shifts) {
    for (let i = 0; i < 2; i++) {
      for (const consecutive of [0, 1, 2, 3]) {
        const history: [number, number] = [0, 0];
        history[i] = consecutive;
        goals.push(
          stateKey({
            position: [map[0].length - 1, map.length - 1],
            direction: [...shift] as [number, number],
            history,
          })
        );
      }
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
