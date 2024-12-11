import { readFileSync } from "fs";

function stoneSplit(n, step) {
	if (step === 25) return 1;
	if (n === 0) return stoneSplit(1, step + 1);
	let digits = n.toString().length;
	if (digits % 2 === 0) {
		return (
			stoneSplit(parseInt(n.toString().substring(0, digits / 2)), step + 1) +
			stoneSplit(parseInt(n.toString().substring(digits / 2)), step + 1)
		);
	}
	return stoneSplit(n * 2024, step + 1);
}

const input = readFileSync("advent/2024/day11/day11-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split(" ")
	.map(x => parseInt(x));

let results = input.map(s => stoneSplit(s, 0)).reduce((x, y) => x + y, 0);

console.log(results);
