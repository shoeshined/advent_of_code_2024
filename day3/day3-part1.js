import { readFileSync } from "fs";

const results = readFileSync("advent/2024/day3/day3-input.txt", {
	encoding: "utf-8",
})
	.match(/mul\([0-9]+,[0-9]+\)/g)
	.map(line => line.match(/\d+/g))
	.reduce((prev, cur) => prev + cur.reduce((x, y) => x * y, 1), 0);

console.log(results);
