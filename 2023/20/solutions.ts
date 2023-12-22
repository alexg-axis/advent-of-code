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
    }
  | {
      type: "broadcaster";
      to: string[];
      changes: Record<string, boolean>;
    }
  | {
      type: "output";
      changes: Record<string, boolean>;
      state: boolean;
    }
  | {
      type: "%";
      state: boolean;
      to: string[];
      changes: Record<string, boolean>;
    }
  | {
      type: "&";
      to: string[];
      states: Record<string, boolean>;
      changes: Record<string, boolean>;
    };
function parseInput(input: Input): Record<string, Config> {
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
  return config;
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

export function solvePart1(input: Input): number {
  const config = parseInput(input);

  const graph: Record<string, Node> = {};
  for (const [k, v] of Object.entries(config)) {
    switch (v.type) {
      case "broadcaster":
        graph[k] = {
          type: "broadcaster",
          to: v.to,
          changes: {},
        };
        break;
      case "output":
        graph[k] = {
          type: "output",
          changes: {},
          state: false,
        };
        break;
      case "%":
        graph[k] = {
          type: "%",
          to: v.to,
          state: false,
          changes: {},
        };
        break;
      case "&":
        graph[k] = {
          type: "&",
          to: v.to,
          states: Object.fromEntries(v.from.map((x) => [x, false])),
          changes: {},
        };
        break;
      case "":
        graph[k] = {
          type: "",
          changes: {},
        };
    }
  }

  console.log(graph);

  let lowPulses = 1000;
  let highPulses = 0;
  for (let i = 0; i < 1000; i++) {
    const queue = ["broadcaster"];
    while (queue.length > 0) {
      const current = queue.shift()!;
      const node = graph[current];
      if (node.type === "broadcaster") {
        for (const next of node.to) {
          console.log(`broadcaster -low-> ${next}`);
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
              console.log(
                `${current} -${node.state ? "high" : "low"}-> ${next}`
              );
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
          console.log(`${current} -${pulse ? "high" : "low"}-> ${next}`);
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
  }

  console.log(highPulses, lowPulses);
  return highPulses * lowPulses;
}
