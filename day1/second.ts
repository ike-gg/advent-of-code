import fs from "fs";
import path from "path";

const inputDataPath = path.join(__dirname, "inputData.txt");
const rawData = fs.readFileSync(inputDataPath, "utf-8");

const rawInvEachElf = rawData.split("\n\n");
const invEachElf = rawInvEachElf.map((elfInv) =>
  elfInv.split("\n").map((calories) => Number(calories))
);

const sumOfCalsEachElf = invEachElf.map((elfInv) => {
  return elfInv.reduce((prev, curr) => prev + curr);
});

const sortedSumsOfCals = sumOfCalsEachElf.sort((a, b) => a - b);

const sumOfTopThree = sortedSumsOfCals.reduce((prev, current, index) => {
  if (index < sortedSumsOfCals.length - 3) return 0;
  return prev + current;
});

console.log("sum of top three:", sumOfTopThree);
