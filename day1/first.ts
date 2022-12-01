import fs from "fs";
import path from "path";

const inputDataPath = path.join(__dirname, "inputData.txt");
const rawData = fs.readFileSync(inputDataPath, "utf-8");

const rawInvEachElf = rawData.split("\n\n");
const invEachElf = rawInvEachElf.map((elfInv) =>
  elfInv.split("\n").map((calories) => Number(calories))
);

const sumOfCalsEachElf = invEachElf.map((elfInv) => {
  let sum = 0;
  elfInv.forEach((calories) => (sum += calories));
  return sum;
});

const mostCalories = sumOfCalsEachElf.reduce((prev, curr) => {
  if (curr > prev) return curr;
  return prev;
});

console.log("most calories:", mostCalories);

//69912
