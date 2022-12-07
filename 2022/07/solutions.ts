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

export function solvePart1(input: Input): number {
  const directoryTree = parseCommandOutput(input);

  // Loop through the directories based on their depth
  const directories = Object.keys(directoryTree).sort(
    (a, b) => b.length - a.length
  );
  for (const directory of directories) {
    directoryTree[directory].size = directoryTree[directory].files
      .map((x) =>
        x.type === "regularFile"
          ? x.size
          : directoryTree[directory + "/" + x.name]?.size || 0
      )
      .reduce(sum);
  }

  return Object.values(directoryTree)
    .filter((x) => x.size <= 100000)
    .map((x) => x.size)
    .reduce(sum);
}
