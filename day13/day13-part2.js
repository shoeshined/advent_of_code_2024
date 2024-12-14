import { readFileSync } from "fs";

function gcd(a, b) {
	return !b ? a : gcd(b, a % b);
}

function findIntercept([x, y, c], [x1, y1, c1]) {
	if (x / y === x1 / y1) return false;
	let xint = (c1 * y - c * y1) / (x1 * y - x * y1),
		yint = (c - x * xint) / y;
	return [xint, yint];
}

function checker(ax, ay, bx, by, goalx, goaly) {
	(goalx += 10 ** 13), (goaly += 10 ** 13);
	if (goalx % gcd(ax, bx) !== 0 || goaly % gcd(ay, by) !== 0) return 0;

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
