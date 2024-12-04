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
left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

for (let i = 0; i < left.length; i++) {
	results += Math.abs(left[i] - right[i]);
}

console.log(results);
