import { readFileSync } from "fs";

function inbound([y, x]) {
	return y >= 0 && y < input.length && x >= 0 && x < input[0].length;
}

function step(num, [y, x]) {
	if (num === 9) return 1;
	let count = 0;
	[
		[1, 0],
		[0, 1],
		[-1, 0],
		[0, -1],
	].forEach(([y1, x1]) => {
		let point = [y + y1, x + x1];
		if (inbound(point) && input[point[0]][point[1]] === num + 1)
			count += step(num + 1, point);
	});
	return count;
}

const input = readFileSync("advent/2024/day10/day10-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(x => x.split("").map(x => parseInt(x)));

let results = 0;

input.forEach((line, y) => {
	line.forEach((n, x) => {
		if (n === 0) results += step(0, [y, x]);
	});
});

console.log(results);
