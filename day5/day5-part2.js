import { readFileSync } from "fs";

function checker(line, rules) {
	for (let i = 0; i < line.length - 1; i++) {
		for (let j = 1; i + j < line.length; j++) {
			if (rules.includes(line[i + j] + "|" + line[i])) {
				return [false, i, j];
			}
		}
	}
	return [true, 0, 0];
}

function orderer(line, rules) {
	let [check, i, j] = checker(line, rules);
	return check
		? line
		: orderer(line.toSpliced(i + j, 1).toSpliced(i, 0, line[i + j]), rules);
}

const input = readFileSync("advent/2024/day5/day5-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n");

const rules = input[0].split("\r\n"),
	updates = input[1].split("\r\n").map(line => line.split(","));
let results = 0;

for (let line of updates) {
	if (!checker(line, rules)[0])
		results += parseInt(orderer(line, rules)[Math.floor(line.length / 2)]);
}

console.log(results);
