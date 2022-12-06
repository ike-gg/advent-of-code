import fs from "fs";
import path from "path";

const inputDataPath = path.join(__dirname, "inputData.txt");
const inputData = fs.readFileSync(inputDataPath, "utf-8").split("");

const findMarker = (distinctChars: number) => {
  return (
    inputData
      .map((_, index) => inputData.slice(index, index + distinctChars))
      .findIndex((dataStream) => {
        return dataStream.every((char, index) => {
          const copyDataStream = [...dataStream];
          copyDataStream.splice(index, 1);
          if (copyDataStream.includes(char)) return false;
          return true;
        });
      }) + distinctChars
  );
};

console.log("first part:", findMarker(4)); //1155
console.log("second part:", findMarker(14)); //2789
