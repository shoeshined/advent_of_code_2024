import { readFileSync } from "fs";

const input = readFileSync("advent/2024/day6/day6-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(""));

let location = [],
	visited = {},
	dir = 1,
	dirs = [
		[0, -1],
		[-1, 0],
		[0, 1],
		[1, 0],
	];

for (let i = 0; i < input.length; i++) {
	let check = input[i].findIndex(x => x === "^");
	if (check >= 0) {
		location = [i, check];
		break;
	}
}
visited[location.toString()] = true;

while (
	location[0] + dirs[dir][0] >= 0 &&
	location[0] + dirs[dir][0] < input.length &&
	location[1] + dirs[dir][1] >= 0 &&
	location[1] + dirs[dir][1] < input[0].length
) {
	if (input[location[0] + dirs[dir][0]][location[1] + dirs[dir][1]] === "#") {
		dir = (dir + 1) % 4;
	}
	location[0] += dirs[dir][0];
	location[1] += dirs[dir][1];
	visited[location.toString()] = true;
}

const results = Object.keys(visited).length;

console.log(results);
