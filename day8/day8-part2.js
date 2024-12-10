import { readFileSync } from "fs";

function inbound([y, x]) {
	return y >= 0 && y < input.length && x >= 0 && x < input[0].length;
}

const input = readFileSync("advent/2024/day8/day8-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(""));

const antenas = new Map(),
	antinodes = new Map();

for (let i = 0; i < input.length; i++) {
	for (let j = 0; j < input[0].length; j++) {
		let char = input[i][j];
		if (char !== ".") {
			antenas.set(char, [[i, j]].concat(antenas.get(char) ?? []));
		}
	}
}

for (let char of antenas) {
	for (let i = 0; i < char[1].length - 1; i++) {
		let [y, x] = char[1][i];
		for (let [y1, x1] of char[1].slice(i + 1)) {
			for (let j of [1, -1]) {
				for (
					let node = [y, x];
					inbound(node);
					node[0] += j * (y - y1), node[1] += j * (x - x1)
				)
					antinodes.set(node.toString(), true);
			}
		}
	}
}

let results = antinodes.size;

console.log(results);
