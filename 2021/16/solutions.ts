import { Input } from "../../utils/deno/input.ts";

type Packet = {
  version: number
  typeId: number
  length: number
  lengthId?: number
  subPacketLength?: number
  subPacketCount?: number
  payload: number | Packet[]
};

function parseNumber(bits: string, start: number, length: number): number {
  return Number.parseInt(bits.slice(start, start + length), 2);
}

function parsePackedNumber(bits: string, start: number): [number, number] {
  let payload = "";
  for (let i = start; i < bits.length; i += 5) {
    payload += bits.slice(i + 1, i + 5);
    if (bits[i] === "0")
      break;
  }
  const length = payload.length + payload.length / 4;
  return [Number.parseInt(payload, 2), length];
}

function parsePacket(bits: string, start: number): Packet {
  let consumed = 0;
  const version = parseNumber(bits, start + consumed, 3);
  consumed += 3;
  const typeId = parseNumber(bits, start + consumed, 3);
  consumed += 3;

  switch (typeId) {
    case 4: {
      const [number, length] = parsePackedNumber(bits, start + consumed);
      consumed += length;
      return { version, typeId, length: consumed, payload: number };
    }
    default: {
      const packetLengthId = bits[start + consumed];
      consumed++;
      const packets: Packet[] = [];
      const packet: Packet = { version, typeId, lengthId: Number.parseInt(packetLengthId, 2), length: 0, payload: packets };
      if (packetLengthId === "0") {
        const totalLength = parseNumber(bits, start + consumed, 15);
        consumed += 15;
        packet.subPacketLength = totalLength;

        for (let i = 0; i < totalLength;) {
          const newPacket = parsePacket(bits, start + consumed);
          consumed += newPacket.length;
          packets.push(newPacket);
          i += newPacket.length;
        }
      } else {
        const packetCount = parseNumber(bits, start + consumed, 11);
        consumed += 11;
        packet.subPacketCount = packetCount;

        for (let i = 0; i < packetCount; i++) {
          const newPacket = parsePacket(bits, start + consumed)
          consumed += newPacket.length;
          packets.push(newPacket);
        }
      }

      packet.length = consumed;
      return packet;
    }
  }
}

export function solvePart1(input: Input): number {
  const bits = input.raw.trim().split("").map(x => Number.parseInt(x, 16)).map(x => x.toString(2).padStart(4, "0")).join("");
  const packet = parsePacket(bits, 0);

  let versionSum = 0;
  const toVisit: Packet[] = [packet];
  while (toVisit.length > 0) {
    const packet = toVisit.shift()!;
    if (Array.isArray(packet.payload))
      toVisit.push(...packet.payload);
    versionSum += packet.version;
  }

  return versionSum;
}

function calculate(packet: Packet): number {
  switch (packet.typeId) {
    case 0: {
      const packets = packet.payload as Packet[];
      return packets.map(x => calculate(x)).reduce((sum, x) => sum + x);
    }
    case 1: {
      const packets = packet.payload as Packet[];
      return packets.map(x => calculate(x)).reduce((product, x) => product * x);
    }
    case 2: {
      const packets = packet.payload as Packet[];
      return Math.min(...packets.map(x => calculate(x)));
    }
    case 3: {
      const packets = packet.payload as Packet[];
      return Math.max(...packets.map(x => calculate(x)));
    }
    case 4: {
      return packet.payload as number;
    }
    case 5: {
      const packets = packet.payload as Packet[];
      const values = packets.map(x => calculate(x));
      return values[0] > values[1] ? 1 : 0;
    }
    case 6: {
      const packets = packet.payload as Packet[];
      const values = packets.map(x => calculate(x));
      return values[0] < values[1] ? 1 : 0;
    }
    case 7: {
      const packets = packet.payload as Packet[];
      const values = packets.map(x => calculate(x));
      return values[0] === values[1] ? 1 : 0;
    }
    default:
      return -1;
  }
}

export function solvePart2(input: Input): number {
  const bits = input.raw.trim().split("").map(x => Number.parseInt(x, 16)).map(x => x.toString(2).padStart(4, "0")).join("");
  const packet = parsePacket(bits, 0);
  return calculate(packet);
}
