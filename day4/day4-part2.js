import { readFileSync } from "fs";

const input = readFileSync("advent/2024/day4/day4-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(""));

const paths = [
	[1, 1],
	[1, -1],
	[-1, -1],
	[-1, 1],
];

let as = [],
	results = 0;

input.forEach((line, y) => {
	for (let x = 0; x < line.length; x++) {
		if (line[x] === "A") as.push([y, x]);
	}
});

as.forEach(([y, x]) => {
	let ms = 0,
		ss = 0,
		diag = 0;
	try {
		paths.forEach(([diry, dirx], i) => {
			if (input[y + diry][x + dirx] === "M") {
				ms++;
				diag = i - diag;
			} else if (input[y + diry][x + dirx] === "S") ss++;
		});
	} catch {}
	if (diag !== 2 && ms === 2 && ss === 2) {
		results++;
	}
});

console.log(results);
