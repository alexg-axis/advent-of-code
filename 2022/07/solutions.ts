import type { Input } from "../../utils/deno/input.ts";
import { sum } from "../../utils/deno/arrays.ts";

interface File {
  type: "regularFile" | "directory";
  name: string;
  size: number;
}

interface Directory {
  name: string;
  size: number;
  files: File[];
}

function parseCommandOutput(input: Input): Record<string, Directory> {
  let cwd: string[] = ["/"];
  const directoryTree: Record<string, Directory> = {};
  for (let i = 0; i < input.lines.length; i++) {
    const [command, ...args] = input.lines[i].substring(2).split(" ");
    if (command === "cd") {
      const path = args[0];
      if (path === "..") {
        cwd.pop();
      } else if (path === "/") {
        cwd = ["/"];
      } else {
        cwd.push(path);
      }
    } else if (command === "ls") {
      const directory: Directory = { name: cwd.at(-1)!, size: 0, files: [] };
      // Consume command
      i++;
      // Loop through command output with lookahead, using next command as
      // boundary
      for (; i < input.lines.length; ) {
        if (input.lines[i].startsWith("$")) {
          i--;
          break;
        }

        const [a, b] = input.lines[i].split(" ");
        if (a === "dir") {
          directory.files.push({ type: "directory", name: b, size: 0 });
        } else {
          directory.files.push({
            type: "regularFile",
            name: b,
            size: Number(a),
          });
        }
        i++;
      }
      directoryTree["/" + cwd.slice(1).join("/")] = directory;
    }
  }
  return directoryTree;
}

function calculateSizes(directoryTree: Record<string, Directory>) {
  // Loop through the directories based on their depth
  const directories = Object.keys(directoryTree).sort(
    (a, b) => b.length - a.length
  );
  for (const directory of directories) {
    directoryTree[directory].size = directoryTree[directory].files
      .map((x) =>
        x.type === "regularFile"
          ? x.size
          : (directory === "/"
              ? directoryTree[directory + x.name]
              : directoryTree[directory + "/" + x.name]
            ).size
      )
      .reduce(sum);
  }
}

export function solvePart1(input: Input): number {
  const directoryTree = parseCommandOutput(input);
  calculateSizes(directoryTree);

  return Object.values(directoryTree)
    .filter((x) => x.size <= 100000)
    .map((x) => x.size)
    .reduce(sum);
}

export function solvePart2(input: Input): number {
  const directoryTree = parseCommandOutput(input);
  calculateSizes(directoryTree);

  const totalDisk = 70000000;
  const requiredFreeDisk = 30000000;
  const usedDisk = directoryTree["/"].size;
  const freeDisk = totalDisk - usedDisk;
  const diskToFree = requiredFreeDisk - freeDisk;

  // Try the directories in ascending order based on their total size
  const directories = Object.keys(directoryTree).sort(
    (a, b) => directoryTree[a].size - directoryTree[b].size
  );
  for (const directory of directories) {
    const size = directoryTree[directory].size;
    if (size >= diskToFree) {
      return size;
    }
  }
  return -1;
}
