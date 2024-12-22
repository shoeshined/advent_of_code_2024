import { readFileSync } from "fs";

function broot(y, x, dir, record, score = 0, turns = 0, path = {}) {
	if (score > 133584) return false;
	if (record.get([y, x].toString()) <= score && turns === 0) return false;
	let newpath = { ...path };
	newpath[`${y},${x}`] = true;
	if (input[y]?.[x] === "S" && dir === 3) return { score, path: newpath };
	let [y1, x1] =
		dir === 0
			? [y - 1, x]
			: dir === 1
			? [y, x + 1]
			: dir === 2
			? [y + 1, x]
			: [y, x - 1];
	record.set([y, x].toString(), score);
	let a =
		input[y1]?.[x1] !== "#"
			? broot(y1, x1, dir, record, score + 1, 0, newpath)
			: false;
	let [b, c] =
		turns === 0
			? [
					broot(y, x, (dir + 1) % 4, record, score + 1000, 1, newpath),
					broot(y, x, (dir + 3) % 4, record, score + 1000, 1, newpath),
			  ]
			: [false, false];
	if (a || b || c) {
		let p = Math.min(
			a.score || Infinity,
			b.score || Infinity,
			c.score || Infinity
		);
		return [a, b, c].find(q => q.score === p);
	}
	return false;
}

const input = readFileSync(import.meta.dirname + "/day16-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(""));

let goal,
	record = new Map();
endloop: for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		if (input[y][x] === "E") {
			goal = [y, x];
			break endloop;
		}
	}
}
let [a, b] = [broot(...goal, 2, record), broot(...goal, 3, record)];

let results = Math.min(a.score || Infinity, b.score || Infinity);

console.log(results);
