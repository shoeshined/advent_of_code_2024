import { readFileSync } from "fs";

function inbound([y, x]) {
	return y >= 0 && y < input.length && x >= 0 && x < input[0].length;
}

function step(num, [y, x], nines) {
	if (num === 9) nines.set([y, x].toString(), true);
	else
		[
			[1, 0],
			[0, 1],
			[-1, 0],
			[0, -1],
		].forEach(dir => {
			let point = [y + dir[0], x + dir[1]];
			if (inbound(point) && input[point[0]][point[1]] === num + 1)
				step(num + 1, point, nines);
		});
}

const input = readFileSync("advent/2024/day10/day10-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(x => x.split("").map(x => parseInt(x)));

let zeros = [],
	results = 0;

input.forEach((line, y) => {
	line.forEach((n, x) => {
		if (n === 0) zeros.push([y, x]);
	});
});

zeros.forEach(zero => {
	let nines = new Map();
	step(0, zero, nines);
	results += nines.size;
});

console.log(results);
