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

function nav(plot, coords, cost, record, dir = 1) {
	if (coords.toString() === exit.toString())
		return { cost, path: [exit.toString()] };
	if (
		plot[coords.toString()] ||
		cost >= (record[coords.toString()] ?? Infinity) ||
		coords[0] < 0 ||
		coords[0] > exit[0] ||
		coords[1] < 0 ||
		coords[1] > exit[1]
	)
		return { cost: Infinity };
	record[coords.toString()] = cost;
	return [0, 1, 3]
		.map(d => {
			d = (dir + d) % 4;
			return nav(plot, direct(d, ...coords), cost + 1, record, d);
		})
		.reduce(
			(prev, cur) =>
				cur.cost < prev.cost
					? { cost: cur.cost, path: [coords.toString(), ...cur.path] }
					: prev,
			{ cost: Infinity }
		);
}

const input = readFileSync(import.meta.dirname + "/day18-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(",").map(n => parseInt(n)));

let path = [],
	plot = {},
	results,
	gridSize = 70,
	startList = 1024;
const exit = [gridSize, gridSize];
for (let i = 0; i < input.length; i++) {
	let record = {};
	if (i < startList) {
		plot[input[i].toString()] = true;
	} else {
		if (i === startList) {
			path = nav(plot, [0, 0], 0, record).path;
			record = {};
		}
		plot[input[i].toString()] = true;
		if (path.includes(input[i].toString())) {
			path = nav(plot, [0, 0], 0, record).path;
			if (!path) {
				results = input[i].toString();
				break;
			}
		}
	}
}

console.log(results);
