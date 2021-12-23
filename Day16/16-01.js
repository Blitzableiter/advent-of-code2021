const fs = require("fs");

const startTime = new Date();

const filename = "./input.txt";
const messages = fs.readFileSync(filename, "utf8").split("\n").map((str) => hexToBinary(str));

let sumOfVersion = 0;
console.log(
  evaluateTypeAndHandle(messages[0]),
);
// for (const message of messages) {
console.log("sumOfVersion", sumOfVersion);
// }

function evaluateTypeAndHandle(binaryPacket) {
  const version = parseInt(binaryPacket.slice(0, 3), 2);
  if (Number.isNaN(version)) return;
  sumOfVersion += version;
  const typeId = parseInt(binaryPacket.slice(3, 6), 2);
  const payload = binaryPacket.slice(6);
  console.log(binaryPacket);
  console.log("version", version);
  console.log("typeId", typeId);

  switch (typeId) {
    // literal value
    case 4:
      // find 5 bit packs until the found one starts with 0 (last one)
      let value = "";
      let index = 0;
      let stillInPayload = true;
      console.log("payload", payload);
      while (stillInPayload) {
        value += payload.slice(index + 1, index + 5);
        if (payload.slice(index, index + 1) === "0") stillInPayload = false;
        index += 5;
        console.log("index", index);
      }
      console.log("value", parseInt(value, 2));
      const rest = payload.slice(index);
      console.log("rest", rest);
      return rest;

      // operator packet
    default:
      return evaluateOperatorPacket(payload);
  }
}

function evaluateOperatorPacket(packet) {
  console.log("payload", packet);
  const lengthTypeId = packet.slice(0, 1);

  console.log("lengthTypeId", lengthTypeId);
  if (lengthTypeId === "0") {
    const lengthOfSubpackets = parseInt(packet.slice(1, 16), 2);
    console.log("lengthOfSubpackets", lengthOfSubpackets);
    const subpackets = packet.slice(16, 16 + lengthOfSubpackets);
    console.log("go handle subpackets", subpackets);
    let rest = evaluateTypeAndHandle(subpackets);
    while (rest && rest.includes("1")) rest = evaluateTypeAndHandle(rest);
    const remaining = packet.slice(16 + lengthOfSubpackets);
    console.log("remaining", remaining);
    return remaining;
  }
  const numberOfSubpackets = parseInt(packet.slice(1, 12), 2);
  console.log("numberOfSubpackets", numberOfSubpackets);
  console.log("packet", packet);

  let rest = packet.slice(12);
  let subpacketsEvaluated = 0;
  while (rest && subpacketsEvaluated !== numberOfSubpackets) {
    console.log("handle subpacket", subpacketsEvaluated);
    console.log("payload", rest);
    rest = evaluateTypeAndHandle(rest);
    subpacketsEvaluated += 1;
  }
  if (rest && rest.includes("1")) return evaluateTypeAndHandle(rest);
}

function hexToBinary(hex) {
  return hex.split("").reduce((tally, current) => (tally + padToMultipleOf(parseInt(current, 16).toString(2), 4)), "");
}

function padToMultipleOf(str = "", factor = 0) {
  // str already has a length of multiples of factor
  if (str.length % factor === 0) return str;

  const multiple = Math.ceil(str.length / factor);
  return str.padStart(multiple * factor, "0");
}

const endTime = new Date();
console.log(`${endTime - startTime}ms`);
