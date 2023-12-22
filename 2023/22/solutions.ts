import { Input } from "../../utils/deno/input.ts";

/*
z
|  y
| /
|/
 \
  \
    x
*/
// l-r, depth, up/down
// z=0 === ground, z=1 lowest coordinate of a brick
// x, y, z
type Vec3 = [number, number, number];

interface Brick {
  position: Vec3;
  // Volume is always up, right, forward
  volume: Vec3;
}

function collides(a: Brick, b: Brick): boolean {
  return (
    a.position[0] < b.position[0] + b.volume[0] &&
    a.position[0] + a.volume[0] > b.position[0] &&
    a.position[1] < b.position[1] + b.volume[1] &&
    a.position[1] + a.volume[1] > b.position[1] &&
    a.position[2] < b.position[2] + b.volume[2] &&
    a.position[2] + a.volume[2] > b.position[2]
  );
}

function dropAll(bricks: Brick[]): number {
  let dropped = 0;
  let changed = -1;
  while (changed !== 0) {
    changed = 0;
    for (let i = bricks.length - 1; i >= 0; i--) {
      if (bricks[i].position[2] === 0) {
        continue;
      }

      let collision = false;
      for (let j = 0; j < bricks.length - 1; j++) {
        if (
          collides(
            {
              position: [
                bricks[i].position[0],
                bricks[i].position[1],
                bricks[i].position[2] - 1,
              ],
              volume: bricks[i].volume,
            },
            bricks[(i + j + 1) % bricks.length]
          )
        ) {
          collision = true;
          break;
        }
      }
      if (!collision) {
        dropped++;
        bricks[i].position[2]--;
        changed++;
      }
    }
  }
  return dropped;
}

export function solvePart1(input: Input): number {
  const bricks = input.lines
    .map(
      (x) => x.split("~").map((x) => x.split(",").map(Number)) as [Vec3, Vec3]
    )
    .map(
      ([start, end]) =>
        ({
          // z=0 === ground, z=1 lowest coordinate of a brick
          position: [start[0], start[1], start[2] - 1],
          volume: [
            end[0] - start[0] + 1,
            end[1] - start[1] + 1,
            end[2] - start[2] + 1,
          ],
        } as Brick)
    )
    .sort((a, b) => b.position[2] - a.position[2]);
  dropAll(bricks);

  let safe = 0;
  for (let i = 0; i < bricks.length; i++) {
    const copy = [
      ...bricks.map(
        (x) =>
          ({
            position: [...x.position],
            volume: [...x.volume],
          } as Brick)
      ),
    ];
    copy.splice(i, 1);
    if (dropAll(copy) === 0) {
      safe++;
    }
  }

  return safe;
}
