import { readFileSync } from "fs";

function findRegion(char, y, x, region) {
	if (coords.has([y, x].toString()) || input[y][x] !== char) return;
	coords.set([y, x].toString(), true);
	regions.set(
		region,
		regions.has(region) ? [...regions.get(region), [y, x]] : [[y, x]]
	);
	dirs.forEach(([y1, x1]) => {
		if (input[y + y1]?.[x + x1]) findRegion(char, y + y1, x + x1, region);
	});
}

const input = readFileSync("advent/2024/day12/day12-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(""));

const coords = new Map(),
	regions = new Map(),
	dirs = [
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1],
	];

input.forEach((line, y) => {
	line.forEach((char, x) => {
		findRegion(char, y, x, [y, x].toString());
	});
});

let results = 0;

regions.forEach(region => {
	region.forEach(([y, x]) => {
		dirs.forEach(([y1, x1]) => {
			results += input[y + y1]?.[x + x1] !== input[y][x] ? region.length : 0;
		});
	});
});

console.log(results);
