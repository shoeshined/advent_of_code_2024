import { readFileSync } from "fs";

const input = readFileSync("advent/2024/day9/day9-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("")
	.map(n => parseInt(n));

let comped = input.flatMap((n, ind) =>
	Array(n).fill(ind % 2 === 0 ? ind / 2 : ".")
);

let filled = [];

for (let i = 0, j = -1; comped.length + j >= i; ) {
	if (comped.at(j) === ".") {
		j--;
		continue;
	}
	if (comped[i] === ".") {
		filled.push(comped.at(j));
		j--;
	} else filled.push(comped[i]);
	i++;
}

let results = filled.reduce((pre, cur, ind) => {
	return pre + cur * ind;
}, 0);

console.log(results);
