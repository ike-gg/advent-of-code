import { inputData } from "./intput";

const firstResult = inputData
  .split("\n")
  .map((row) => row.split("").filter(Number))
  .map((row) => {
    const first = row.at(0)!;
    const last = row.at(-1)!;
    return Number(first + last);
  })
  .reduce((a, c) => a + c);

const spelledNumbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const secondResult = inputData
  .split("\n")
  .map((row) => {
    spelledNumbers.forEach((digit, index) => {
      if (row.includes(digit)) {
        row = row.replaceAll(digit, `${digit}${String(index)}${digit}`);
      }
    });
    return row;
  })
  .map((row) => row.split("").filter(Number))
  .map((row) => {
    const first = row.at(0);
    const last = row.at(-1);
    const number = Number(first! + last!);
    return number;
  })
  .reduce((a, c) => a + c);

console.table({ firstResult, secondResult });
