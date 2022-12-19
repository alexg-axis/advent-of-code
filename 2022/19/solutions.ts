import { product, sum } from "../../utils/deno/arrays.ts";
import { Input } from "../../utils/deno/input.ts";

interface Cost {
  ore: number;
  clay: number;
  obsidian: number;
}

interface Blueprint {
  ore: Cost;
  clay: Cost;
  obsidian: Cost;
  geode: Cost;
}

interface Inventory {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
}

function parseCost(line: string): [string, Cost] {
  // Each obsidian robot costs 3 ore and 14 clay
  const match = line.match(
    /Each ([\w]+) robot costs (\d+) ([\w]+)( and (\d+) ([\w]+))?\.?/
  );

  if (!match) throw new Error("matching failure");

  const robot = match[1];
  const cost: Cost = {
    ore: 0,
    clay: 0,
    obsidian: 0,
  };

  cost[match[3] as keyof Cost] = Number(match[2]);
  if (match[5] && match[6]) {
    cost[match[6] as keyof Cost] = Number(match[5]);
  }

  return [robot, cost];
}

export function willBePurchaseable(
  blueprint: Blueprint,
  robots: Inventory,
  robot: string
): boolean {
  let purchaseable = true;

  // Requires ore
  if (blueprint[robot as keyof Blueprint].ore > 0)
    purchaseable = purchaseable && robots["ore"] > 0;

  // Requires clay
  if (blueprint[robot as keyof Blueprint].clay > 0)
    purchaseable = purchaseable && robots["clay"] > 0;

  // Requires obsidian
  if (blueprint[robot as keyof Blueprint].obsidian > 0)
    purchaseable = purchaseable && robots["obsidian"] > 0;

  return purchaseable;
}

function canPurchase(
  blueprint: Blueprint,
  inventory: Inventory,
  robot: string
): boolean {
  const cost = blueprint[robot as keyof Blueprint];
  return (
    cost.ore <= inventory.ore &&
    cost.clay <= inventory.clay &&
    cost.obsidian <= inventory.obsidian
  );
}

function purchase(
  blueprint: Blueprint,
  inventory: Inventory,
  robots: Inventory,
  robot: string
): { inventory: Inventory; robots: Inventory } {
  inventory = {
    ore: inventory.ore - blueprint[robot as keyof Blueprint].ore,
    clay: inventory.clay - blueprint[robot as keyof Blueprint].clay,
    obsidian: inventory.obsidian - blueprint[robot as keyof Blueprint].obsidian,
    geode: inventory.geode,
  };

  robots = {
    ore: robots.ore,
    clay: robots.clay,
    obsidian: robots.obsidian,
    geode: robots.geode,
  };
  robots[robot as keyof Inventory]++;

  return {
    inventory,
    robots,
  };
}

function branch(
  blueprint: Blueprint,
  inventory: Inventory,
  robots: Inventory,
  n: number,
  max: Record<number, number> = {},
  goal = "",
  depth = 0
): {
  inventory: Inventory;
  robots: Inventory;
} {
  if (goal === "") {
    const results: Record<string, { inventory: Inventory; robots: Inventory }> =
      {};

    // Take a new branch for each possible next purchase
    if (willBePurchaseable(blueprint, robots, "ore")) {
      results["ore"] = branch(
        blueprint,
        inventory,
        robots,
        n,
        max,
        "ore",
        depth
      );
    }
    if (willBePurchaseable(blueprint, robots, "clay")) {
      results["clay"] = branch(
        blueprint,
        inventory,
        robots,
        n,
        max,
        "clay",
        depth
      );
    }
    if (willBePurchaseable(blueprint, robots, "obsidian")) {
      results["obsidian"] = branch(
        blueprint,
        inventory,
        robots,
        n,
        max,
        "obsidian",
        depth
      );
    }
    if (willBePurchaseable(blueprint, robots, "geode")) {
      results["geode"] = branch(
        blueprint,
        inventory,
        robots,
        n,
        max,
        "geode",
        depth
      );
    }

    return Object.values(results).sort(
      (a, b) => b.inventory.geode - a.inventory.geode
    )[0];
  } else if (depth < n) {
    // Try to purchase
    const robotsBeforePurchase = robots;
    if (canPurchase(blueprint, inventory, goal)) {
      ({ inventory, robots } = purchase(blueprint, inventory, robots, goal));
      goal = "";
    }

    // Mine
    inventory = {
      ore: inventory.ore + robotsBeforePurchase.ore,
      clay: inventory.clay + robotsBeforePurchase.clay,
      obsidian: inventory.obsidian + robotsBeforePurchase.obsidian,
      geode: inventory.geode + robotsBeforePurchase.geode,
    };

    max[depth] = Math.max(max[depth] || 0, inventory.geode);
    if (inventory.geode < max[depth]) {
      return { inventory, robots };
    }
    return branch(blueprint, inventory, robots, n, max, goal, depth + 1);
  }

  return { inventory, robots };
}

function calculateGeodes(blueprint: Blueprint, n = 24): number {
  let inventory: Inventory = {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0,
  };

  let robots: Inventory = {
    ore: 1,
    clay: 0,
    obsidian: 0,
    geode: 0,
  };

  ({ inventory, robots } = branch(blueprint, inventory, robots, n));

  // console.log(inventory);
  // console.log(robots);

  return inventory.geode;
}

export function solvePart1(input: Input): number {
  const blueprints: Blueprint[] = input.lines.map(
    (x) =>
      Object.fromEntries(
        x
          .replace(/Blueprint \d+: /, "")
          .split(/\. /)
          .map(parseCost)
      ) as unknown as Blueprint
  );

  return blueprints.map((x, i) => (i + 1) * calculateGeodes(x)).reduce(sum);
}

export function solvePart2(input: Input): number {
  const blueprints: Blueprint[] = input.lines.slice(0, 3).map(
    (x) =>
      Object.fromEntries(
        x
          .replace(/Blueprint \d+: /, "")
          .split(/\. /)
          .map(parseCost)
      ) as unknown as Blueprint
  );

  return blueprints.map((x) => calculateGeodes(x, 32)).reduce(product);
}
