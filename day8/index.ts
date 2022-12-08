import fs from "fs";
import path from "path";

const inputDataPath = path.join(__dirname, "inputData.txt");
const inputData = fs
  .readFileSync(inputDataPath, "utf-8")
  .split("\n")
  .map((row) => row.split(""))
  .map((x) => x.map(Number));

let visibleTrees = 0;
let highestScenicScore = 0;

inputData.forEach((x, xIndex) => {
  x.forEach((y, yIndex) => {
    if (
      yIndex === 0 ||
      yIndex === x.length - 1 ||
      xIndex === 0 ||
      xIndex === x.length - 1
    ) {
      visibleTrees++;
      return;
    }

    const column = inputData.map((row) => row[yIndex]);
    const row = inputData[xIndex];

    const top = column.slice(0, xIndex);
    const bottom = column.slice(xIndex + 1).reverse();
    const left = row.slice(0, yIndex).reverse();
    const right = row.slice(yIndex + 1);

    const directions = [top, right, bottom, left];

    const scenicScore = directions
      .map((direction) => {
        let score = 0;
        direction.some((tree) => {
          if (y > tree) {
            score++;
            return false;
          }
          if (y <= tree) {
            score++;
            return true;
          }
          return true;
        });
        return score;
      })
      .reduce((prev, curr) => prev * curr);

    if (scenicScore > highestScenicScore) highestScenicScore = scenicScore;

    const isVisible = directions.some((direction) =>
      direction.every((tree) => tree < y)
    );

    if (isVisible) visibleTrees++;
  });
});

console.log("visible trees", visibleTrees);
console.log("highest scenic score", highestScenicScore);
