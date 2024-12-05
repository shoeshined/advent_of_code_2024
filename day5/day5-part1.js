import { readFileSync } from "fs";

const input = readFileSync("advent/2024/day5/day5-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n");

const rules = input[0].split("\r\n"),
	updates = input[1].split("\r\n").map(line => line.split(","));
let results = 0;

loop: for (let line of updates) {
	for (let i = 0; i < line.length - 1; i++) {
		for (let j = 1; i + j < line.length; j++) {
			if (rules.includes(line[i + j] + "|" + line[i])) continue loop;
		}
	}
	results += parseInt(line[Math.floor(line.length / 2)]);
}

console.log(results);
