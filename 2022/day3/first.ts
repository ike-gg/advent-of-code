import fs from "fs";
import path from "path";

const inputDataPath = path.join(__dirname, "inputData.txt");
const inputData = fs.readFileSync(inputDataPath, "utf-8").split("\n");

const priorities =
  "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const findCommonChar = (...strings: string[]) => {
  const stringsChars = strings.map((string) => string.split(""));

  const firstString = stringsChars[0];
  const restStrings = stringsChars.splice(1);

  const commonChar = firstString.find((char) =>
    restStrings.every((string) => string.includes(char))
  );

  return commonChar;
};

const dataPriorities = inputData.map((dataRow) => {
  const length = dataRow.length;
  const firstItem = dataRow.slice(0, length / 2);
  const secondItem = dataRow.slice(length / 2, length);

  const commonChar = findCommonChar(firstItem, secondItem);
  const priority = priorities.findIndex((char) => char === commonChar);

  return priority;
});

const result = dataPriorities.reduce((prev, curr) => prev + curr);

console.log(result);
