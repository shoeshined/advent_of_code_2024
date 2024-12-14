import { readFileSync } from "fs";

function findIntercept([a, b, c], [a1, b1, c1]) {
	if (a / b === a1 / b1) return false;
	let x = (c1 * b - c * b1) / (a1 * b - a * b1),
		y = (c - a * x) / b;
	return [x, y];
}

function checker(ax, ay, bx, by, goalx, goaly) {
	(goalx += 10 ** 13), (goaly += 10 ** 13);
	let int = findIntercept([ax, bx, goalx], [ay, by, goaly]);
	return int.every(n => n >= 0 && Number.isInteger(n))
		? int[0] * 3 + int[1]
		: 0;
}

const input = readFileSync(import.meta.dirname + "/day13-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n")
	.map(block => block.match(/[0-9]+/g).map(x => parseInt(x)))
	.reduce((prev, block) => prev + checker(...block), 0);

console.log(input);
