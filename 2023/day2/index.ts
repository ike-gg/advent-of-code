import { inputData } from "./input";

const parsed = inputData.split("\n").map((row) => {
  const [id, sequence] = row.split(":") as [string, string];
  const gameId = Number(id.split(" ")[1]);
  const game = sequence
    .split(";")
    .map((s) => s.split(", ").flat(5))
    .flat(2)
    .map((i) => i.trim());

  const colors = { green: 0, blue: 0, red: 0 };

  game.forEach((step) => {
    const [amount, color] = step.split(" ") as [string, keyof typeof colors];
    const currentColor = Number(amount);
    if (currentColor > colors[color]) {
      colors[color] = currentColor;
    }
  });

  const power = Object.entries(colors).reduce((acc, curr) => {
    return acc * curr[1];
  }, 1);

  return { id: gameId, colors, power };
});

const firstResult = parsed
  .filter(({ colors }) => {
    const { blue, green, red } = colors;
    if (red <= 12 && green <= 13 && blue <= 14) {
      console.log(colors, "passed");
      return true;
    } else {
      console.log(colors, "not passed");
      return false;
    }
  })
  .reduce((acc, curr) => acc + curr.id, 0);

const secondResult = parsed.reduce((acc, curr) => acc + curr.power, 0);

console.table({ firstResult, secondResult });
