import { Input } from "../../utils/deno/input.ts";
import { sum } from "../../utils/deno/arrays.ts";

export function toNumber(x: string): number {
  return x
    .split("")
    .map((x) => {
      if (x === "-") {
        return -1;
      } else if (x === "=") {
        return -2;
      } else {
        return Number(x);
      }
    })
    .reverse()
    .reduce((result, x, i) => result + Math.pow(5, i) * x, 0);
}

export function toSNAFU(x: number): string {
  const base5 = x.toString(5).split("").map(Number).reverse();
  let result = "";
  // console.log(result.split("").reverse().join(""));
  // console.log([...base5].reverse());
  for (let i = 0; i < base5.length; i++) {
    const quota = Math.floor(base5[i] / 3);
    const wanted = base5[i];
    const carryOver = Math.ceil(quota / 3);
    if (carryOver > 0) {
      if (i + 1 < base5.length) {
        base5[i + 1] += carryOver;
      } else {
        base5.push(carryOver);
      }
      const diff = carryOver * 5 - wanted;
      if (diff === 1) {
        result += "-";
      } else if (diff === 2) {
        result += "=";
      } else if (diff === 0) {
        result += "0";
      } else {
        throw new Error(`go bad diff converting ${x} to SNAFU: ${diff}`);
      }
    } else {
      result += base5[i].toString();
    }
    base5[i] = 0;
    // console.log(result.split("").reverse().join(""));
    // console.log([...base5].reverse());
  }
  return result.split("").reverse().join("");
}

export function solvePart1(input: Input): string {
  return toSNAFU(input.lines.map(toNumber).reduce(sum));
}
