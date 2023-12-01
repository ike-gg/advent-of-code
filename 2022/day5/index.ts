import fs from "fs";
import path from "path";

const inputDataPath = path.join(__dirname, "inputData.txt");
const inputData = fs
  .readFileSync(inputDataPath, "utf-8")
  .split("\n\n")
  .map((row) => row.split("\n"));

const [rawStacks, rawMoves] = inputData;

const moves = rawMoves
  .map((row) => row.split(" "))
  .map((row) => row.filter(Number).map(Number));

const getStacks = () => {
  const stacks: string[][] = [];

  [...rawStacks]
    .reverse()[0]
    .split(" ")
    .filter(Number)
    .forEach(() => stacks.push([]));

  [...rawStacks]
    .reverse()
    .slice(1)
    .map((row) => row.replaceAll("    ", " xxx").split(" "))
    .forEach((row) => {
      row.forEach((crate, index) => {
        if (crate === "xxx") return;
        stacks[index].push(crate);
      });
    });

  return stacks;
};

const stacks1 = getStacks();
const stacks2 = getStacks();

moves.forEach((move) => {
  const [cratesCount, fromStack, toStack] = move;
  for (let x = 0; x < cratesCount; x++) {
    const movingStack = stacks1[fromStack - 1].pop();
    stacks1[toStack - 1].push(movingStack!);
  }

  const length = stacks2[fromStack - 1].length;
  const movingStack = stacks2[fromStack - 1].splice(
    length - cratesCount,
    length
  );
  stacks2[toStack - 1].push(...movingStack);
});

const result = (stack: string[][]) => {
  return stack.reduce((string, stack) => {
    const lastIndex = stack.length - 1;
    return (string += stack[lastIndex][1]);
  }, "");
};

console.log(result(stacks1), result(stacks2));
//TDCHVHJTG NGCMPJLHV
