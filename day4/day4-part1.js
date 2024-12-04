import { readFileSync } from "fs";

const input = readFileSync("advent/2024/day4/day4-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(""));

const paths = [
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1],
	[1, 1],
	[1, -1],
	[-1, 1],
	[-1, -1],
];

let xs = [],
	results = 0;

input.forEach((line, y) => {
	for (let x = 0; x < line.length; x++) {
		if (line[x] === "X") xs.push([y, x]);
	}
});

xs.forEach(([y, x]) => {
	paths.forEach(([diry, dirx]) => {
		try {
			if (
				input[y + diry][x + dirx] === "M" &&
				input[y + 2 * diry][x + 2 * dirx] === "A" &&
				input[y + 3 * diry][x + 3 * dirx] === "S"
			)
				results++;
		} catch {}
	});
});

console.log(results);
