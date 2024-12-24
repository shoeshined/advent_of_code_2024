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

function bfs(end, plot) {
	let queue = [],
		visited = {};
	queue.push({ coords: [0, 0], score: 0, path: [] });

	while (queue.length > 0) {
		const item = queue.shift();
		const [x, y] = item.coords;
		if (x === end[0] && y === end[1]) return item;
		if (item.score >= (visited[`${x},${y}`] ?? Infinity)) continue;

		visited[`${x},${y}`] = item.score;

		[0, 1, 2, 3].forEach(d => {
			let [y1, x1] = direct(d, y, x);
			if (
				!plot.has(`${x},${y}`) &&
				x1 >= 0 &&
				x1 <= end[0] &&
				y1 >= 0 &&
				y1 <= end[1]
			)
				queue.push({
					coords: [x1, y1],
					score: item.score + 1,
					path: [...item.path, `${x},${y}`],
				});
		});
	}
	return { path: false };
}

const input = readFileSync(import.meta.dirname + "/day18-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(",").map(n => parseInt(n)));

const exit = [70, 70],
	plot = new Set(input.slice(0, 1024).map(a => a.toString()));
let path = bfs(exit, plot).path,
	results;

for (let i = 1024; i < input.length; i++) {
	plot.add(input[i].toString());
	if (path.includes(input[i].toString())) {
		path = bfs(exit, plot).path;
		if (!path) {
			results = input[i].toString();
			break;
		}
	}
}

console.log(results);
