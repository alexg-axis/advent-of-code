import { Input } from "../../utils/deno/input.ts";

type Algorithm = [number, ...number[]] & { length: 512 };

type Image = {[key: number]: {[key: number]: number}};

type Bounds = {minX: number, maxX: number, minY: number, maxY: number};

export function parseInput(input: Input): [Algorithm, Image] {
  const parts = input.raw.trim().split("\n\n");

  const algorithm = parts[0].split("").map(x => x === "#" ? 1 : 0) as Algorithm;

  const image: Image = {};
  const lines = parts[1].split("\n");
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      image[y] = image[y] || {};
      image[y][x] = lines[y][x] === "#" ? 1 : 0;
    }
  }

  return [algorithm, image];
}

function kernel(image: Image, algorithm: Algorithm, origin: {x: number, y: number}, infiniteValue: number): number {
  let map = "";
  for (let y = origin.y - 1; y <= origin.y + 1; y++) {
    for (let x = origin.x - 1; x <= origin.x + 1; x++) {
      if (typeof image[y] === "undefined")
        map += infiniteValue;
      else if (typeof image[y][x] === "undefined")
        map += infiniteValue;
      else
        map += image[y][x] === 1 ? "1": "0";
    }
  }

  const index = Number.parseInt(map, 2);
  return algorithm[index];
}

// NOTE: only works for images for which the algoritm starts with a bright pixel and ends with a dim pixel due to some
// shortcuts
function kernelImage(inputImage: Image, algorithm: Algorithm, isInfinite: boolean): Image {
  const outputImage: Image = {};

  const { minX, maxX, minY, maxY } = bounds(inputImage);

  for (let y = minY - 1; y <= maxY + 1; y++) {
    for (let x = minX - 1; x <= maxX + 1; x++) {
      if (typeof outputImage[y] === "undefined")
        outputImage[y] = {};
      if (typeof outputImage[y][x] === "undefined")
        outputImage[y][x] = kernel(inputImage, algorithm, {x, y}, isInfinite ? algorithm[algorithm.length - 1] : algorithm[0]);
    }
  }

  return outputImage;
}

function bounds(image: Image): Bounds {
  const sortedY = Object.keys(image).map(Number).sort((a, b) => a - b);
  const minY = sortedY[0];
  const maxY = sortedY[sortedY.length - 1];
  let minX = 0;
  let maxX = 0;
  for (let y = minY; y <= maxY; y++) {
    if (typeof image[y] === "undefined")
      continue;
    const sortedX = Object.keys(image[y]).map(Number).sort((a, b) => a - b);
    if (sortedX[0] < minX)
      minX = sortedX[0];
    if (sortedX[sortedX.length - 1] > maxX)
      maxX = sortedX[sortedX.length - 1];
  }

  return {minX, maxX, minY, maxY};
}

function printImage(image: Image) {
  let output = "";
  const { minX, maxX, minY, maxY } = bounds(image);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (typeof image[y] === "undefined")
         output += ".";
      else
        output += image[y][x] === 1 ? "#" : ".";
    }
    output += "\n";
  }

  console.log(output);
}

function countLight(image: Image): number {
  let count = 0;
  for (const y of Object.keys(image).map(Number)) {
    for (const x of Object.keys(image[y]).map(Number))
      count += image[y][x] === 1 ? 1 : 0;
  }
  return count;
}

export function solvePart1([algorithm, inputImage]: [Algorithm, Image]): number {
  let output = inputImage;
  for (let i = 0; i < 2; i++) {
    output = kernelImage(output, algorithm, i % 2 == 0);
    // printImage(output);
  }

  return countLight(output);
}

export function solvePart2([algorithm, inputImage]: [Algorithm, Image]): number {
  let output = inputImage;
  for (let i = 0; i < 50; i++) {
    output = kernelImage(output, algorithm, i % 2 == 0);
    // printImage(output);
  }

  return countLight(output);
}
