import fs from "fs";
import path from "path";

const inputDataPath = path.join(__dirname, "inputData.txt");
const rawData = fs.readFileSync(inputDataPath, "utf-8");

const allRounds = rawData.split("\n").map((round) => round.split(" ").join(""));

//AX rock, X lose
//BY paper, Y draw
//CZ scissors, Z win

const win = ["AY", "BZ", "CX"];
const lose = ["AZ", "BX", "CY"];
const draw = ["AX", "BY", "CZ"];

const allRoundsResults = allRounds.map((round) => {
  let sum = 0;

  const opponentMove = round[0];
  const roundResult = round[1];

  let possibilities: string[] = [];

  if (roundResult === "X") {
    possibilities = lose;
    sum += 0;
  }
  if (roundResult === "Y") {
    possibilities = draw;
    sum += 3;
  }
  if (roundResult === "Z") {
    possibilities = win;
    sum += 6;
  }

  const roundCase = possibilities.find((result) =>
    result.startsWith(opponentMove)
  );

  if (roundCase![1] === "X") sum += 1;
  if (roundCase![1] === "Y") sum += 2;
  if (roundCase![1] === "Z") sum += 3;

  return sum;
});

const totalScore = allRoundsResults.reduce((prev, curr) => prev + curr);

console.log(totalScore);
