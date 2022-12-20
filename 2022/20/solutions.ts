import { sum } from "../../utils/deno/arrays.ts";
import { Input } from "../../utils/deno/input.ts";

type LinkedList<T> = Node<T>[];
type Node<T> = { x: T; next: Node<T> | null };

function createList(input: Input): LinkedList<number> {
  const list: LinkedList<number> = input.lines
    .map(Number)
    .map((x) => ({ x, next: null }));
  for (let i = 0; i < list.length - 1; i++) {
    list[i].next = list[i + 1];
  }
  return list;
}

function mix(list: LinkedList<number>, start: Node<number>) {
  let current: Node<number> | null = start;
  while (current) {
    const position = list.indexOf(current);
    // Wrapping does not consume a step
    let newPosition = position + current.x;
    if (newPosition < 0)
      newPosition = (newPosition % (list.length - 1)) + list.length - 1;
    if (newPosition >= list.length)
      newPosition = newPosition % (list.length - 1);
    list.splice(position, 1);
    list.splice(newPosition, 0, current);
    current = current.next;
  }
}

function grove(list: LinkedList<number>): number {
  const zero = list.findIndex((x) => x.x === 0);
  return [1000, 2000, 3000]
    .map((x) => (zero + x) % list.length)
    .map((x) => list[x].x)
    .reduce(sum);
}

export function solvePart1(input: Input): number {
  const list = createList(input);

  mix(list, list[0]);

  return grove(list);
}

export function solvePart2(input: Input): number {
  const list = createList(input);
  for (const x of list) {
    x.x *= 811589153;
  }

  const start = list[0];
  for (let i = 0; i < 10; i++) {
    mix(list, start);
  }

  return grove(list);
}
