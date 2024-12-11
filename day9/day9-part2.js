import { readFileSync } from "fs";

function inARow(array, i) {
	let count = 1;
	for (let j = i + 1; array[j] === array[i]; j++, count++) {}
	return count;
}

const input = readFileSync("advent/2024/day9/day9-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("")
	.map(n => parseInt(n));

let comped = input.flatMap((n, ind) =>
	Array(n).fill(ind % 2 === 0 ? ind / 2 : ".")
);

for (let num = Math.ceil(input.length / 2) - 1; num >= 0; num--) {
	let numInd = comped.indexOf(num),
		len = inARow(comped, numInd);
	for (let j = 0; j < numInd; j++) {
		if (comped[j] === "." && inARow(comped, j) >= len) {
			comped.splice(numInd, len, ...Array(len).fill("."));
			comped.splice(j, len, ...Array(len).fill(num));
			break;
		}
	}
}

let results = comped.reduce((pre, cur, ind) => {
	return cur === "." ? pre : pre + cur * ind;
}, 0);

console.log(results);
