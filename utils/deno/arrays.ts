/**
 * Create a reduction function to chunk an array in (at most) length values.
 * @example
 * [1, 2, 3, 4, 5].reduce(chunks(2), [])
 */
export function chunks<T>(
  length: number
): (previousValue: T[][], currentValue: T, currentIndex: number) => T[][];
/**
 * Chunk an array in (at most) length values.
 * @example
 * chunks([1, 2, 3, 4, 5], 2)
 */
export function chunks<T>(array: T[], length: number): T[][];
export function chunks<T>(arrayOrLength: T[] | number, length?: number) {
  if (typeof arrayOrLength === "number") {
    const length = arrayOrLength;
    return (previousValue: T[][], currentValue: T, currentIndex: number) => {
      const chunkIndex = Math.floor(currentIndex / length);
      if (previousValue.length <= chunkIndex) {
        previousValue.push([currentValue]);
      } else {
        previousValue[chunkIndex].push(currentValue);
      }
      return previousValue;
    };
  } else if (length !== undefined) {
    const array = arrayOrLength;
    return Array(Math.ceil(array.length / length))
      .fill(undefined)
      .map((_, index) => index * length)
      .map((begin) => array.slice(begin, begin + length));
  }
}

/**
 * Sum an array using reduce.
 * @example
 * [1, 2, 3].reduce(sum, 0)
 */
export function sum(previousValue: number, currentValue: number): number;
/**
 * Sum an array.
 * @example
 * sum([1, 2, 3])
 */
export function sum(array: number[]): number;
export function sum(
  previousValueOrArray: number[] | number,
  currentValue?: number
) {
  if (typeof previousValueOrArray === "number") {
    const previousValue = previousValueOrArray;
    return previousValue + currentValue!;
  } else {
    const array = previousValueOrArray;
    return array.reduce((sum, x) => sum + x);
  }
}

/**
 * Multiply elements in an array using reduce.
 * @example
 * [1, 2, 3].reduce(product, 1)
 */
export function product(previousValue: number, currentValue: number): number;
/**
 * Sum an array.
 * @example
 * product([1, 2, 3])
 */
export function product(array: number[]): number;
export function product(
  previousValueOrArray: number[] | number,
  currentValue?: number
) {
  if (typeof previousValueOrArray === "number") {
    const previousValue = previousValueOrArray;
    return previousValue * currentValue!;
  } else {
    const array = previousValueOrArray;
    return array.reduce((product, x) => product * x);
  }
}

/**
 * Maximum element.
 * @example
 * [1, 2, 3].reduce(max, 1)
 */
export function max(previousValue: number, currentValue: number): number;
/**
 * Sum an array.
 * @example
 * max([1, 2, 3])
 */
export function max(array: number[]): number;
export function max(
  previousValueOrArray: number[] | number,
  currentValue?: number
) {
  if (typeof previousValueOrArray === "number") {
    const previousValue = previousValueOrArray;
    return Math.max(previousValue, currentValue!);
  } else {
    const array = previousValueOrArray;
    return array.reduce((max, x) => Math.max(max, x));
  }
}

/**
 * Minimum element.
 * @example
 * [1, 2, 3].reduce(max, 1)
 */
export function min(previousValue: number, currentValue: number): number;
/**
 * Sum an array.
 * @example
 * min([1, 2, 3])
 */
export function min(array: number[]): number;
export function min(
  previousValueOrArray: number[] | number,
  currentValue?: number
) {
  if (typeof previousValueOrArray === "number") {
    const previousValue = previousValueOrArray;
    return Math.min(previousValue, currentValue!);
  } else {
    const array = previousValueOrArray;
    return array.reduce((min, x) => Math.min(min, x));
  }
}

/**
 * Bounds.
 * @example
 * [1, 2, 3].reduce(bounds, [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])
 */
export function bounds(
  previousValue: [number, number],
  currentValue: number
): [number, number];
/**
 * Sum an array.
 * @example
 * bounds([1, 2, 3])
 */
export function bounds(array: number[]): [number, number];
export function bounds(
  previousValueOrArray: number[] | [number, number],
  currentValue?: number
) {
  if (currentValue !== undefined) {
    const [previousMin, previousMax] = previousValueOrArray;
    return [
      Math.min(previousMin, currentValue),
      Math.max(previousMax, currentValue),
    ];
  } else {
    const array = previousValueOrArray;
    return array.reduce(bounds, [
      Number.MAX_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
    ]);
  }
}
