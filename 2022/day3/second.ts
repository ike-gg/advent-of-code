import fs from "fs";
import path from "path";
import _ from "lodash";

const inputDataPath = path.join(__dirname, "inputData.txt");
const inputData = fs.readFileSync(inputDataPath, "utf-8").split("\n");
const chunkedData = _.chunk(inputData, 3) as [string, string, string][];

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

const dataPriorities = chunkedData.map((data) => {
  const commonLetter = findCommonChar(...data);
  const priority = priorities.findIndex((char) => char === commonLetter);

  return priority;
});

const result = dataPriorities.reduce((prev, curr) => prev + curr);

console.log(result);
