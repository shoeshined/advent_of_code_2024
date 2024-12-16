import { readFileSync } from "fs";

function mover(y, x, [diry, dirx], char) {
	let [y1, x1] = [y + diry, x + dirx];
	if (map[y1]?.[x1] === "O") mover(y1, x1, [diry, dirx], "O");
	if (map[y1]?.[x1] === ".") {
		map[y1][x1] = char;
		map[y][x] = ".";
	}
	return map[y][x] === "." ? [y1, x1] : [y, x];
}

const input = readFileSync(import.meta.dirname + "/day15-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n");

let map = input[0].split("\r\n").map(line => line.split("")),
	moves = input[1]
		.replaceAll("\r\n", "")
		.split("")
		.map(c =>
			c === "^" ? [-1, 0] : c === ">" ? [0, 1] : c === "v" ? [1, 0] : [0, -1]
		),
	position = 0;

for (let i = 0; i < map.length; i++) {
	let ind = map[i].indexOf("@");
	if (ind >= 0) {
		position = [i, ind];
		break;
	}
}

for (let dir of moves) {
	position = mover(...position, dir, "@");
}
const results = map.reduce((pre, cur, y) => {
	return (
		pre + cur.reduce((pr1, c, x) => pr1 + (c === "O" ? 100 * y + x : 0), 0)
	);
}, 0);

console.log(results);
