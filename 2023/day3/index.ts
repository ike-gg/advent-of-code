import { input } from "./input";

const isNumber = (value: string) => {
  return Boolean(Number(value) || Number(value) === 0);
};

type PartNumberCoordinates = {
  x1: number;
  x2: number;
  y: number;
  value: number;
};

//l approach

const symbols = ["*", "=", "+", "/", "&", "#", "%", "-", "$", "@"];
const map = input.split("\n").map((line) => line.split(""));
const partNumbers: PartNumberCoordinates[] = [];
map.forEach((row, rowIndex) => {
  let value: string | null = null;
  let lastNumberIndex: number | null = null;

  row.forEach((column, columnIndex, columnArray) => {
    if (isNumber(column)) {
      if (lastNumberIndex === null) lastNumberIndex = columnIndex;
      value === null ? (value = column) : (value += column);
      if (columnIndex === columnArray.length - 1) {
        partNumbers.push({
          x1: lastNumberIndex,
          x2: columnIndex,
          y: rowIndex,
          value: parseInt(value || "0"),
        });
      }
    } else if (!isNumber(column)) {
      if (lastNumberIndex !== null) {
        const lastIndexNumber = columnIndex - 1;
        partNumbers.push({
          x1: lastNumberIndex,
          x2: lastIndexNumber,
          y: rowIndex,
          value: parseInt(value || "0"),
        });
        lastNumberIndex = null;
        value = null;
      }
    }
  });
});

const partsAsString = partNumbers.map((coordinates) => {
  const x1 = Math.max(coordinates.x1 - 1, 0);
  const x2 = coordinates.x2 + 1;
  const y1 = coordinates.y - 1;
  const y2 = coordinates.y + 1;

  const rows = map.filter((_, index) => index >= y1 && index <= y2);
  const columns = rows.map((row) => row.slice(x1, x2 + 1));

  const partString = columns.map((column) => column.join("")).join("");
  const surrounding = partString
    .split("")
    .filter((e) => !isNumber(e))
    .join("");

  return {
    string: partString,
    surrounding,
    value: coordinates.value,
  };
});

const firstResult = partsAsString
  .filter((part) =>
    part.surrounding.split("").some((element) => {
      const dec = symbols.includes(element);
      return dec;
    })
  )
  .reduce((acc, curr) => acc + curr.value, 0);

//fc this shit

// map.forEach((row, rowIndex) => {
//   row.forEach((column, columnIndex) => {
//     if (column !== "*") return;

//     const x1 = Math.max(columnIndex - 1, 0);
//     const x2 = columnIndex + 1;
//     const y1 = rowIndex - 1;
//     const y2 = rowIndex + 1;

//     const rows = map.filter((_, index) => index >= y1 && index <= y2);
//     const columns = rows.map((row) => row.slice(x1, x2 + 1));

//     let rowIndexesIncludingNumbers = 0;

//     columns.forEach((column, index) => {
//       if (index !== 1) {
//         if (isNumber(column[0]) && !isNumber(column[1]) && isNumber(column[2])) {
//           numbers += 2;
//           return;
//         }

//       }
//       column.forEach((element) => {
//         if (element === "*") return;
//       });
//     });

//     console.log(columns);
//   });
// });

console.table({ firstResult });
