import { Input } from "../../utils/deno/input.ts";

interface Config {
  type: "broadcaster" | "output" | "%" | "&" | "";
  name: string;
  to: string[];
  from: string[];
}

type Node =
  | {
      type: "";
      changes: Record<string, boolean>;
      from: string[];
    }
  | {
      type: "broadcaster";
      to: string[];
      changes: Record<string, boolean>;
      from: string[];
    }
  | {
      type: "output";
      changes: Record<string, boolean>;
      state: boolean;
      from: string[];
    }
  | {
      type: "%";
      state: boolean;
      to: string[];
      changes: Record<string, boolean>;
      from: string[];
    }
  | {
      type: "&";
      to: string[];
      states: Record<string, boolean>;
      changes: Record<string, boolean>;
      from: string[];
    };
function parseInput(input: Input): Record<string, Node> {
  const config = Object.fromEntries(
    input.lines.map(parseConfig).map((x) => [x.name, x])
  );
  config["output"] = { type: "output", name: "output", to: [], from: [] };
  for (const [k, v] of Object.entries(config)) {
    for (const to of v.to) {
      if (!config[to]) {
        config[to] = {
          type: "",
          name: to,
          from: [k],
          to: [],
        };
      }
      config[to].from.push(k);
    }
  }

  const graph: Record<string, Node> = {};
  for (const [k, v] of Object.entries(config)) {
    switch (v.type) {
      case "broadcaster":
        graph[k] = {
          type: "broadcaster",
          to: v.to,
          changes: {},
          from: Array.from(new Set(v.from)),
        };
        break;
      case "output":
        graph[k] = {
          type: "output",
          changes: {},
          state: false,
          from: Array.from(new Set(v.from)),
        };
        break;
      case "%":
        graph[k] = {
          type: "%",
          to: v.to,
          state: false,
          changes: {},
          from: Array.from(new Set(v.from)),
        };
        break;
      case "&":
        graph[k] = {
          type: "&",
          to: v.to,
          states: Object.fromEntries(v.from.map((x) => [x, false])),
          changes: {},
          from: Array.from(new Set(v.from)),
        };
        break;
      case "":
        graph[k] = {
          type: "",
          changes: {},
          from: Array.from(new Set(v.from)),
        };
    }
  }

  return graph;
}

function parseConfig(line: string): Config {
  const [_, type, name, to] = line.match(/^([&%]?)(\w+) -> (.*)/)!;
  return {
    type: type === "" ? "broadcaster" : (type as "%" | "&"),
    name: name,
    to: to.split(", "),
    from: [],
  };
}

function solve1(graph: Record<string, Node>): [number, number] {
  let lowPulses = 0;
  let highPulses = 0;
  const queue = ["broadcaster"];
  while (queue.length > 0) {
    const current = queue.shift()!;
    const node = graph[current];
    if (node.type === "broadcaster") {
      for (const next of node.to) {
        // console.log(`broadcaster -low-> ${next}`);
        graph[next].changes[current] = false;
        lowPulses++;
        queue.push(next);
      }
    } else if (node.type === "output") {
      // Do nothing
    } else if (node.type === "%") {
      const changes = node.changes;
      node.changes = {};

      // TODO: Check if we ever get two changes in a row, or if we only get
      // one signal. For now, assume one
      for (const change of Object.values(changes)) {
        if (change === false) {
          node.state = !node.state;
          for (const next of node.to) {
            // console.log(
            //   `${current} -${node.state ? "high" : "low"}-> ${next}`
            // );
            graph[next].changes[current] = node.state;
            if (node.state) {
              highPulses++;
            } else {
              lowPulses++;
            }
            queue.push(next);
          }
        }
      }

      // console.log("  ", changes);
      // console.log("  ", node.state);
    } else if (node.type === "&") {
      const changes = node.changes;
      node.changes = {};

      // TODO: Check if we ever get two changes in a row, or if we only get
      // one signal. For now, assume one
      for (const [from, change] of Object.entries(changes)) {
        node.states[from] = change;
      }

      let pulse = false;
      let on = 0;
      let off = 0;
      let length = 0;
      for (const x of Object.values(node.states)) {
        if (x) {
          on++;
        } else {
          off++;
        }
        length++;
      }

      if (on === length) {
        pulse = false;
      } else {
        pulse = true;
      }

      for (const next of node.to) {
        // console.log(`${current} -${pulse ? "high" : "low"}-> ${next}`);
        graph[next].changes[current] = pulse;
        if (pulse) {
          highPulses++;
        } else {
          lowPulses++;
        }
        queue.push(next);
      }
    }
  }

  return [lowPulses, highPulses];
}

export function solvePart1(input: Input): number {
  const graph = parseInput(input);
  let totalLow = 1000;
  let totalHigh = 0;
  for (let i = 0; i < 1000; i++) {
    const [low, high] = solve1(graph);
    totalLow += low;
    totalHigh += high;
  }
  return totalLow * totalHigh;
}

function solve2(
  graph: Record<string, Node>,
  activations: Record<string, number[]>,
  i: number
) {
  const queue = ["broadcaster"];
  while (queue.length > 0) {
    const current = queue.shift()!;
    const node = graph[current];
    if (node.type === "broadcaster") {
      for (const next of node.to) {
        graph[next].changes[current] = false;
        queue.push(next);
      }
    } else if (node.type === "output") {
      // Do nothing
    } else if (node.type === "%") {
      const changes = node.changes;
      node.changes = {};
      for (const change of Object.values(changes)) {
        if (change === false) {
          node.state = !node.state;
          for (const next of node.to) {
            graph[next].changes[current] = node.state;
            queue.push(next);
          }
        }
      }
    } else if (node.type === "&") {
      const changes = node.changes;
      node.changes = {};
      for (const [from, change] of Object.entries(changes)) {
        node.states[from] = change;
      }

      let pulse = false;
      let on = 0;
      let off = 0;
      let length = 0;
      for (const x of Object.values(node.states)) {
        if (x) {
          on++;
        } else {
          off++;
        }
        length++;
      }

      if (on === length) {
        pulse = false;
      } else {
        pulse = true;
      }

      if (current in activations && pulse) {
        if (activations[current].length === 0) {
          activations[current].push(i);
        } else if (
          i !== activations[current][activations[current].length - 1]
        ) {
          activations[current].push(i);
        }
      }

      for (const next of node.to) {
        graph[next].changes[current] = pulse;
        queue.push(next);
      }
    }
  }
}

export function solvePart2(input: Input): number {
  // Four inputs -> one conjunction -> output
  // Track when four inputs are low to find LCM:
  // In the given input it's the following nodes:
  // xj, qs, kz, km
  const graph = parseInput(input);
  const activations = {
    xj: [],
    qs: [],
    kz: [],
    km: [],
  };
  for (let i = 0; i < 1e4; i++) {
    solve2(graph, activations, i);
    // console.log(activations);
  }
  const cycles = {
    xj: activations.xj[1] - activations.xj[0],
    qs: activations.qs[1] - activations.qs[0],
    kz: activations.kz[1] - activations.kz[0],
    km: activations.km[1] - activations.km[0],
  };
  return cycles.xj * cycles.qs * cycles.kz * cycles.km;
}
