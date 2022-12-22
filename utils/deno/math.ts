/** Like % but actual mathematical modulo. */
export function mod(x: number, n: number): number {
  return ((x % n) + n) % n;
}
