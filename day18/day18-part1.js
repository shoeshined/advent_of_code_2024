import { readFileSync } from "fs";

function direct(dir, y, x) {
	return dir === 0
		? [y - 1, x]
		: dir === 1
		? [y, x + 1]
		: dir === 2
		? [y + 1, x]
		: [y, x - 1];
}

function nav(plot, coords, cost, dir = 1) {
	if (coords.toString() === exit.toString()) return cost;
	if (
		plot[coords.toString()] ||
		cost >= (record[coords.toString()] ?? Infinity) ||
		coords[0] < 0 ||
		coords[0] > exit[0] ||
		coords[1] < 0 ||
		coords[1] > exit[1]
	)
		return Infinity;
	record[coords.toString()] = cost;
	let newCost = cost + 1;
	return Math.min(
		...[0, 1, 3].map(d => {
			d = (dir + d) % 4;
			let next = direct(d, ...coords);
			return nav(plot, next, newCost, d);
		})
	);
}

const input = readFileSync(import.meta.dirname + "/day18-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(",").map(n => parseInt(n)));

let plot = {},
	record = {};
const exit = [70, 70];
for (let i = 0; i < 1024; i++) {
	plot[input[i].toString()] = true;
}

let results = nav(plot, [0, 0], 0);

console.log(results);
