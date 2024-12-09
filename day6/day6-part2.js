import { readFileSync } from "fs";

function between(n, big) {
	if (n >= 0 && n < big) return true;
	return false;
}

function checker(init, visited) {
	let count = 0;
	const keys = Object.keys(visited).map(x => x.split(","));
	for (let [y, x] of keys) {
		let location = [...init],
			d = 0,
			record = {};
		while (true) {
			let nexty = location[0] + dirs[d][0],
				nextx = location[1] + dirs[d][1];
			if (!between(nexty, input.length) || !between(nextx, input[0].length))
				break;
			if (
				input[nexty][nextx] === "#" ||
				(nexty === parseInt(y) && nextx === parseInt(x))
			)
				d = (d + 1) % 4;

			location[0] += dirs[d][0];
			location[1] += dirs[d][1];
			if (record[location.toString() + "," + d]) {
				count++;
				break;
			}
			record[location.toString() + "," + d] = true;
		}
	}
	return count;
}

const input = readFileSync("advent/2024/day6/day6-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(""));

let init = [],
	dirs = [
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1],
	];

for (let i = 0; i < input.length; i++) {
	let check = input[i].findIndex(x => x === "^");
	if (check >= 0) {
		init = [i, check];
		break;
	}
}
let location = [...init],
	visited = {},
	dir = 0;
visited[location.toString()] = true;

while (true) {
	visited[location.toString()] = true;
	let nexty = location[0] + dirs[dir][0],
		nextx = location[1] + dirs[dir][1];
	if (!between(nexty, input.length) || !between(nextx, input[0].length)) break;
	if (input[nexty][nextx] === "#") {
		dir = (dir + 1) % 4;
	}
	location[0] += dirs[dir][0];
	location[1] += dirs[dir][1];
}
let results = checker([...init], { ...visited });

console.log(results);
