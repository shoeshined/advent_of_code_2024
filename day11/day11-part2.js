import { readFileSync } from "fs";

function stoneSplit(n, step) {
	if (step === 75) return 1;
	if (cashe.has([n, step].toString())) return cashe.get([n, step].toString());
	let count,
		digits = n.toString().length;
	if (n === 0) count = stoneSplit(1, step + 1);
	else if (digits % 2 === 0)
		count =
			stoneSplit(parseInt(n.toString().substring(0, digits / 2)), step + 1) +
			stoneSplit(parseInt(n.toString().substring(digits / 2)), step + 1);
	else count = stoneSplit(n * 2024, step + 1);
	cashe.set([n, step].toString(), count);
	return count;
}

const input = readFileSync("advent/2024/day11/day11-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split(" ")
	.map(x => parseInt(x));

let cashe = new Map(),
	results = input.map(s => stoneSplit(s, 0)).reduce((x, y) => x + y, 0);

console.log(results);
