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
      }
      value = parseInt(value, 2);
      const rest = payload.slice(index);
      return { rest, value: [value] };

    default: // operator packet
      const val = evaluateOperatorPacket(payload);
      const { value: returnedValues } = val;
      let returnVal = 0;
      let first;
      let second;
      switch (typeId) {
        case 0: // sum
          for (const returnedValue of returnedValues) returnVal += returnedValue;
          break;

        case 1: // product
          returnVal = 1;
          for (const returnedValue of returnedValues) returnVal *= returnedValue;
          break;

        case 2: // minimum
          [returnVal] = returnedValues.sort((a, b) => a - b);
          break;

        case 3: // maximum
          [returnVal] = returnedValues.sort((a, b) => b - a);
          break;

        case 5: // greater than
          [first, second] = returnedValues;
          returnVal = first > second ? 1 : 0;
          break;

        case 6: // less than
          [first, second] = returnedValues;
          returnVal = first < second ? 1 : 0;
          break;

        case 7: // equality
          [first, second] = returnedValues;
          returnVal = first === second ? 1 : 0;
          break;

        default:
          console.error("This should not have happened");
      }
      const returning = { ...val, value: [returnVal] };
      return returning;
  }
}

function evaluateOperatorPacket(packet) {
  console.log("payload", packet);
  const lengthTypeId = packet.slice(0, 1);

  console.log("lengthTypeId", lengthTypeId);
  const values = [];

  if (lengthTypeId === "0") {
    const lengthOfSubpackets = parseInt(packet.slice(1, 16), 2);
    console.log("lengthOfSubpackets", lengthOfSubpackets);
    const subpackets = packet.slice(16, 16 + lengthOfSubpackets);
    console.log("go handle subpackets", subpackets);
    const back = { ...evaluateTypeAndHandle(subpackets) } || { rest: null };
    let { rest } = back;
    values.push(...back.value);
    while (rest && rest.includes("1")) {
      const reply = evaluateTypeAndHandle(rest);
      values.push(...reply.value);
      rest = reply.rest;
    }
    const remaining = packet.slice(16 + lengthOfSubpackets);
    const retVal = { rest: remaining, value: values };
    return { ...retVal };
  }
  const numberOfSubpackets = parseInt(packet.slice(1, 12), 2);
  console.log("numberOfSubpackets", numberOfSubpackets);
  console.log("packet", packet);

  let rest = packet.slice(12);
  let subpacketsEvaluated = 0;
  while (rest && subpacketsEvaluated !== numberOfSubpackets) {
    console.log("handle subpacket", subpacketsEvaluated);
    console.log("payload", rest);
    const reply = evaluateTypeAndHandle(rest);
    values.push(...reply.value);
    rest = reply.rest;
    subpacketsEvaluated += 1;
  }
  if (rest && rest.includes("1")) {
    return { rest, value: values };
  }
  return { rest: null, value: values };
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
