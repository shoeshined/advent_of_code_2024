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

let start,
	end,
	blocks = [];
for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		if (input[y][x] === "E") end = [y, x];
		else if (input[y][x] === "S") start = [y, x];
		else if (input[y][x] === "#") blocks.push([y, x]);
	}
}

const visited = bfs(start, end, new Map());

const cheated = blocks.flatMap(block => {
	return [0, 1].map(d => {
		let [[y, x], [y1, x1]] = [direct(d, ...block), direct(d + 2, ...block)];
		return visited.has(`${y},${x}`) && visited.has(`${y1},${x1}`)
			? Math.abs(visited.get(`${y},${x}`) - visited.get(`${y1},${x1}`)) - 2
			: 0;
	});
});

const results = cheated.reduce((pre, cur) => pre + (cur >= 100 ? 1 : 0), 0);

console.log(results);
