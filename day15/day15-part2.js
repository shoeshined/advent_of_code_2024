import { readFileSync } from "fs";

function checkAhead(y, x, diry) {
	switch (map[y]?.[x]) {
		case "#":
			return false;
		case ".":
			return true;
		case "]":
			return checkAhead(y, x - 1, diry);
		case "[":
			return (
				checkAhead(y + diry, x, diry) && checkAhead(y + diry, x + 1, diry)
			);
	}
}

function mover(y, x, dir) {
	let char = map[y][x],
		[diry, dirx] = [
			dir < 2 ? (dir < 1 ? -1 : 1) : 0,
			dir > 1 ? (dir === 2 ? -1 : 1) : 0,
		];
	let [y1, x1] = [y + diry, x + dirx];
	if (char === "]") return mover(y, x - 1, dir);
	if (char === ".") return;

	if (char === "[") {
		if (dir > 1) {
			let x2 = x + (dir === 2 ? -1 : 2);
			mover(y, x2, dir);
			if (map[y]?.[x2] === ".") {
				map[y][x2] = dir === 2 ? "[" : "]";
				map[y][x + 1] = dir === 2 ? "." : "[";
				map[y][x] = dir === 2 ? "]" : ".";
			}
		} else {
			if (checkAhead(y, x, diry)) {
				mover(y1, x, dir);
				mover(y1, x + 1, dir);
				map[y][x + 1] = ".";
				map[y][x] = ".";
				map[y1][x] = "[";
				map[y1][x + 1] = "]";
			}
		}
	} else if (char === "@") {
		mover(y1, x1, dir);
		if (map[y1]?.[x1] === ".") {
			map[y1][x1] = char;
			map[y][x] = ".";
		}
		return map[y][x] === "." ? [y1, x1] : [y, x];
	}
}

const input = readFileSync(import.meta.dirname + "/day15-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n");

let map = input[0]
		.split("\r\n")
		.map(line =>
			line
				.split("")
				.flatMap(c =>
					c === "#"
						? ["#", "#"]
						: c === "."
						? [".", "."]
						: c === "O"
						? ["[", "]"]
						: ["@", "."]
				)
		),
	moves = input[1]
		.replaceAll("\r\n", "")
		.split("")
		.map(c => (c === "^" ? 0 : c === ">" ? 3 : c === "v" ? 1 : 2)),
	position = 0;

for (let i = 0; i < map.length; i++) {
	let ind = map[i].indexOf("@");
	if (ind >= 0) {
		position = [i, ind];
		break;
	}
}

for (let i = 0; i < moves.length; i++) {
	position = mover(...position, moves[i]);
}
const results = map.reduce((pre, cur, y) => {
	return (
		pre + cur.reduce((pr1, c, x) => pr1 + (c === "[" ? 100 * y + x : 0), 0)
	);
}, 0);

console.log(results);
