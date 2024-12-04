import { readFileSync } from "fs";

const input = readFileSync("advent/2024/day2/day2-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(" ").map(x => parseInt(x)));

let results = 0;

input.forEach(line => {
	let upOrDown = 0,
		safe = 1;
	for (let i = 1; i < line.length; i++) {
		let dif = line[i - 1] - line[i];
		if (i === 1) {
			upOrDown = Math.sign(dif);
		}
		if (
			Math.sign(dif) !== upOrDown ||
			Math.abs(dif) > 3 ||
			Math.abs(dif) < 1
		) {
			safe = 0;
			break;
		}
	}
	results += safe;
});

console.log(results);
