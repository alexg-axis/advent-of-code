import { sum } from "../../utils/deno/arrays.ts";
import { Input } from "../../utils/deno/input.ts";

type LinkedList<T> = Node<T>[];
type Node<T> = { x: T; next: Node<T> | null };

export function solvePart1(input: Input): number {
  const list: LinkedList<number> = input.lines
    .map(Number)
    .map((x) => ({ x, next: null }));
  for (let i = 0; i < list.length - 1; i++) {
    list[i].next = list[i + 1];
  }

  let current: Node<number> | null = list[0];
  while (current) {
    const position = list.indexOf(current);
    // Wrapping does not consume a step
    let newPosition = position + current.x;
    if (newPosition < 0) newPosition = newPosition + list.length - 1;
    if (newPosition >= list.length)
      newPosition = newPosition % (list.length - 1);
    list.splice(position, 1);
    list.splice(newPosition, 0, current);
    current = current.next;
  }

  const zero = list.findIndex((x) => x.x === 0);
  const result = [1000, 2000, 3000]
    .map((x) => (zero + x) % list.length)
    .map((x) => list[x].x)
    .reduce(sum);

  return result;
}
