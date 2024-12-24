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

function dijkstra(start, goal) {
	const visited = new Set(),
		record = {},
		queue = [{ coords: start, score: 0, dir: 1 }];

	while (queue.length) {
		queue.sort((a, b) => a.score - b.score);
		let { coords, score, dir } = queue.shift();
		let [y, x] = coords;

		if (
			score >= (record[`${y},${x},${dir}`] ?? Infinity) ||
			visited.has(`${y},${x},${dir}`)
		)
			continue;

		visited.add(`${y},${x},${dir}`);
		if (y === goal[0] && x === goal[1]) return score;

		record[`${y},${x},${dir}`] = score;

		for (let d of [0, 1, 3]) {
			let newDir = (dir + d) % 4,
				newScore = record[`${y},${x},${dir}`] + (d === 0 ? 1 : 1001);
			let [y1, x1] = direct(newDir, y, x);

			if (!input[y1]?.[x1] || input[y1]?.[x1] !== "#") {
				queue.push({
					coords: [y1, x1],
					score: newScore,
					dir: newDir,
				});
			}
		}
	}
}

const input = readFileSync(import.meta.dirname + "/day16-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(""));

let start, goal;
for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		if (input[y][x] === "E") goal = [y, x];
		else if (input[y][x] === "S") start = [y, x];
	}
}

let results = dijkstra(start, goal);

console.log(results);
