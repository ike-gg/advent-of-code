import fs from "fs";
import path from "path";

const inputDataPath = path.join(__dirname, "inputData.txt");
const rawData = fs.readFileSync(inputDataPath, "utf-8");

const allRounds = rawData.split("\n").map((round) => round.split(" ").join(""));

//A X - rock
//B Y - paper
//C Z - scissors

const win = ["AY", "BZ", "CX"];
const lose = ["AZ", "BX", "CY"];
const draw = ["AX", "BY", "CZ"];

const allRoundsResults = allRounds.map((round) => {
  let sum = 0;

  const playerMove = round[1];

  if (playerMove === "X") sum += 1;
  if (playerMove === "Y") sum += 2;
  if (playerMove === "Z") sum += 3;

  if (win.includes(round)) sum += 6;
  if (draw.includes(round)) sum += 3;
  if (lose.includes(round)) sum += 0;

  return sum;
});

const totalScore = allRoundsResults.reduce((prev, curr) => prev + curr);

console.log(totalScore);
