import { Input } from "../../utils/deno/input.ts";

export function solvePart1(input: Input): number {
  const times: number[] = input.lines[0]
    .replace(/^Time: +| *$/, "")
    .split(/ +/)
    .map(Number);
  const records: number[] = input.lines[1]
    .replace(/^Distance: +| *$/, "")
    .split(/ +/)
    .map(Number);

  const wins: number[] = new Array(times.length).fill(0);
  for (let race = 0; race < times.length; race++) {
    let raceWins = 0;
    for (let startDelay = 1; startDelay < times[race]; startDelay++) {
      const distance = startDelay * (times[race] - startDelay);
      if (distance > records[race]) {
        raceWins++;
      }
    }
    wins[race] = raceWins;
  }

  return wins.reduce((product, x) => product * x);
}
