import * as path from "https://deno.land/std/path/mod.ts";

const directory = path.dirname(path.fromFileUrl(Deno.mainModule));

const raw = await Deno.readTextFile(path.resolve(directory, "input.txt"))

/** Input represents a puzzle's input. */
export class Input {
  constructor(public readonly raw: string) {}

  /** The lines of the input. Trims trailing whitespace. */
  get lines() {
    return this.raw.trimEnd().split("\n")
  }

  /** The numbers of the input, one number per line. */
  get numbers() {
    return this.lines.map(x => Number(x))
  }
}

/** The puzzle's input */
const input = new Input(raw)
export default input
