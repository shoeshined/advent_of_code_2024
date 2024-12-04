import { readFileSync } from "fs";

const input = readFileSync("advent/2024/day3/day3-input.txt", {
	encoding: "utf-8",
}).trim();

const expressions = input.match(/mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\)/g);

let on = true,
	results = 0;
expressions.forEach(line => {
	if (line === "do()") on = true;
	else if (line === "don't()") on = false;
	else if (on) results += line.match(/\d+/g).reduce((x, y) => x * y, 1);
});

console.log(results);
