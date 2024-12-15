import { readFileSync, writeFileSync } from "fs";
import { confirm } from "@inquirer/prompts";

function mod(n, m) {
	return ((n % m) + m) % m;
}

const input = readFileSync(import.meta.dirname + "/day14-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(block => block.match(/-?[0-9]+/g).map(x => parseInt(x)));

const [w, h] = [101, 103];
let results = 0;

for (let i = 1; ; i++) {
	let grid = Array(h)
			.fill(0)
			.map(x => Array(w).fill(0)),
		check = false;
	input.forEach(([x1, y1, vx, vy]) => {
		let [y, x] = [mod(y1 + vy * i, h), mod(x1 + vx * i, w)];
		if (grid[y][x]) check = true;
		grid[y][x]++;
	});

	let image = grid.map(l => l.join("")).join("\r\n");
	writeFileSync(import.meta.dirname + "/day14-results.txt", image);
	if (!check && (await confirm({ message: "Is it a tree?" }))) {
		results = i;
		break;
	}
}

console.log(results);
