import { readFileSync } from "fs";

const input = readFileSync("advent/2024/day1/input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split(/\s\s\s|\r\n/);

let [left, right, results] = [[], [], 0];

input.forEach((num, i) => {
	if (i % 2 === 0) {
		left.push(num);
	} else right.push(num);
});

left.forEach(n => {
	results += n * right.filter(x => x === n).length;
});

console.log(results);
