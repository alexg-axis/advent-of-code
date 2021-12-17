import { Input } from "../../utils/deno/input.ts";

type Target = {
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
};

type Tuple = [number, number];

export function parseInput(input: Input): Target {
  const parts = input.raw.trim().replace("target area: ", "").split(", ").map(x => x.slice(2).split(".."));
  return {
    minX: Number(parts[0][0]),
    maxX: Number(parts[0][1]),
    minY: Number(parts[1][0]),
    maxY: Number(parts[1][1]),
  };
}

export function solvePart1(input: Target): number {
  // Positive is up
  let maxHeight = 0;

  for (let velocityX = 0; velocityX < input.maxX; velocityX++) {
    for (let velocityY = input.minY; velocityY < 500; velocityY++) {
      const [positions, valid] = simulateForwards(input, [velocityX, velocityY], 500);
      if (valid) {
        const max = positions.map(x => x[1]).sort((a, b) => b - a)[0];
        if (max > maxHeight)
          maxHeight = max;
      }
    }
  }

  return maxHeight;
}

export function solvePart2(input: Target): number {
  // Positive is up
  let validCount = 0;

  for (let velocityX = 0; velocityX <= input.maxX; velocityX++) {
    for (let velocityY = input.minY; velocityY < 500; velocityY++) {
      const [_, valid] = simulateForwards(input, [velocityX, velocityY], 500);
      if (valid)
        validCount++;
    }
  }

  return validCount;
}

function simulateForwards(target: Target, [initialVelocityX, initialVelocityY]: Tuple, steps: number): [Tuple[], boolean] {
  let x = 0;
  let y = 0;

  let velocityX = initialVelocityX;
  let velocityY = initialVelocityY;

  const positions: Tuple[] = [[0, 0]];
  for (let i = 0; i < steps; i++) {
    // The probe's `x` position increases by its `x` velocity.
    x += velocityX;
    // The probe's `y` position increases by its `y` velocity.
    y += velocityY;
    // Due to drag, the probe's `x` velocity changes by `1` toward the value `0`; that is, it decreases by `1` if it is greater than `0`, increases by `1` if it is less than `0`, or does not change if it is already `0`.
    velocityX = Math.max(velocityX - 1, 0);
    // Due to gravity, the probe's `y` velocity decreases by `1`.
    velocityY--;

    positions.push([x, y]);
    if (x >= target.minX && x <= target.maxX && y >= target.minY && y <= target.maxY)
      return [positions, true];

    // A probe cannot change direction when past the target
    if (x > target.maxX || y < target.minY)
      return [positions, false];
  }

  return [positions, false];
}
