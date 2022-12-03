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
 * [1, 2, 3].reduce(sum)
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
