import { readFileSync, writeFileSync } from "fs";

function direct(dir, y, x) {
	switch (dir) {
		case 0:
			return [y - 1, x];
		case 1:
			return [y, x + 1];
		case 2:
			return [y + 1, x];
		case 3:
			return [y, x - 1];
	}
}

function broot(start, goal) {
	let record = {},
		score = Infinity,
		paths = [];

	const points = [{ y: start[0], x: start[1], price: 0, path: [], dir: 1 }];

	while (points.length) {
		const current = points.shift(),
			name = `${current.y},${current.x},${current.dir}`;
		current.path.push(name);

		if (current.y === goal[0] && current.x === goal[1]) {
			if (current.price < score) {
				paths = [current.path];
				score = current.price;
			}
			if (current.price === score) paths.push(current.path);
			continue;
		}

		record[name] ||= Infinity;
		if (record[name] < current.price) continue;
		record[name] = current.price;
		if (current.price > score) continue;

		[0, 1, 2, 3].forEach(dir => {
			if (dir === (current.dir + 2) % 4) return;
			const [y, x] = direct(dir, current.y, current.x);
			if (input[y][x] === "#") return;
			points.push({
				y,
				x,
				price:
					dir === current.dir ? current.price + 1 : current.price + 1001,
				dir,
				path: [...current.path],
			});
		});
	}

	return paths;
}

const input = readFileSync(import.meta.dirname + "/day16-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(""));

let goal, start;
for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		if (input[y][x] === "E") goal = [y, x];
		else if (input[y][x] === "S") start = [y, x];
	}
}

let list = {};
broot(start, goal).forEach(path => {
	path.map(s => s.substring(0, s.length - 2)).forEach(s => (list[s] = true));
});
const results = Object.keys(list);

console.log(results.length);

//this part is for making a visual representation
let map = "";
for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		if (results.includes([y, x].toString())) map += "O";
		else map += input[y][x];
	}
	map += "\r\n";
}
writeFileSync(import.meta.dirname + "/day16-results.txt", map);
