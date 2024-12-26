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

function bfs(start, end, visited) {
	let queue = [{ coords: start, score: 0 }];

	while (queue.length > 0) {
		const item = queue.shift();
		const [y, x] = item.coords;
		if (item.score >= (visited.get(`${y},${x}`) ?? Infinity)) continue;
		visited.set(`${y},${x}`, item.score);

		if (y === end[0] && x === end[1]) return visited;

		[0, 1, 2, 3].forEach(d => {
			let [y1, x1] = direct(d, y, x);
			if (
				input[y1]?.[x1] !== "#" &&
				x1 >= 0 &&
				x1 < input[0].length &&
				y1 >= 0 &&
				y1 < input.length
			)
				queue.push({
					coords: [y1, x1],
					score: item.score + 1,
				});
		});
	}
	return false;
}

const input = readFileSync(import.meta.dirname + "/day20-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(""));

let start, end;
for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		if (input[y][x] === "E") end = [y, x];
		else if (input[y][x] === "S") start = [y, x];
	}
}

const visited = bfs(start, end, new Map());
const keys = visited.keys().toArray(),
	saves = [],
	checked = new Set();

for (let i = 0; i < visited.size; i++) {
	for (let y = -20; y <= 20; y++) {
		for (let x = -20; x <= 20; x++) {
			const dis = Math.abs(y) + Math.abs(x),
				[y1, x1] = keys[i].split(",").map(x => parseInt(x)),
				[y2, x2] = [y1 + y, x1 + x];

			if (
				dis <= 20 &&
				!checked.has(`${y2},${x2}`) &&
				visited.has(`${y2},${x2}`)
			)
				saves.push(
					Math.abs(visited.get(keys[i]) - visited.get(`${y2},${x2}`)) - dis
				);
		}
	}
	checked.add(keys[i]);
}

const results = saves.reduce((pre, cur) => pre + (cur >= 100 ? 1 : 0), 0);

console.log(results);
