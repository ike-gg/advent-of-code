import fs from "fs";
import path from "path";

const inputDataPath = path.join(__dirname, "inputData.txt");
const inputData = fs
  .readFileSync(inputDataPath, "utf-8")
  .split("\n")
  .map((ranges) =>
    ranges.split(",").map((range) => range.split("-").map(Number))
  );

const firstResult = inputData.filter((ranges) => {
  const [firstRange, secondRange] = ranges;
  if (
    (firstRange[0] <= secondRange[0] && firstRange[1] >= secondRange[1]) ||
    (firstRange[1] <= secondRange[1] && firstRange[0] >= secondRange[0])
  )
    return true;
  return false;
}).length;

const secondResult = inputData.filter((ranges) => {
  const arrayFromRanges = ranges.map((range) => {
    const length = range[1] - range[0] + 1;
    return Array.from({ length }, (_, index) => index + range[0]);
  });
  const [firstArray, secondArray] = arrayFromRanges;
  return firstArray.find((number) => secondArray.includes(number));
}).length;

console.log(firstResult, secondResult);
