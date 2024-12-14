import { readFileSync } from "fs";

function gcd(a, b) {
	return !b ? a : gcd(b, a % b);
}

function findIntercept([x, y, c], [x1, y1, c1]) {
	if (x / y === x1 / y1) return false;
	let xint = (c1 / y1 - c / y) / (x1 / y1 - x / y),
		yint = (c - x * xint) / y;
	return [xint, yint];
}

function checker([ax, ay], [bx, by], [goalx, goaly]) {
	(goalx += 10000000000000), (goaly += 10000000000000);
	if (goalx % gcd(ax, bx) !== 0 || goaly % gcd(ay, by) !== 0) return 0;

	let intercept = findIntercept([ax, bx, goalx], [ay, by, goaly]).map(n => {
		return (n * 1000) % 1000 >= 999 || (n * 1000) % 1000 < 1
			? Math.round(n)
			: -1;
	});
	return intercept.every(n => n >= 0 && Number.isInteger(n))
		? intercept[0] * 3 + intercept[1]
		: 0;
}

const input = readFileSync(import.meta.dirname + "/day13-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n")
	.map(block =>
		block.split("\r\n").map((line, ind) => {
			return line
				.split(", ")
				.map(part => parseInt(part.split(ind === 2 ? "=" : "+")[1]));
		})
	)
	.reduce((prev, block) => prev + checker(...block), 0);

console.log(input);
