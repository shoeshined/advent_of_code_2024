import { readFileSync } from "fs";

function gcd(a, b) {
	return !b ? a : gcd(b, a % b);
}

function modInverse(a, m) {
	if (gcd(a, m) > 1) return -1;
	for (let x = 1; x < m; x++) if (((a % m) * (x % m)) % m == 1) return x;
	return 0;
}

function dioph(a, b, c) {
	let g = gcd(a, b),
		[a1, b1, c1] = [a / g, b / g, c / g],
		x = ((c1 % b1) * modInverse(a1, b1)) % b1,
		y = (c1 - a1 * x) / b1;
	return [x, y, b1, -a1];
}

function findIntercept([x, y, a, b], [x1, y1, a1, b1]) {
	if (b / a === b1 / a1) return false;
	let xint =
			(((x * b) / a - (x1 * b1) / a1 + y1 - y) * a * a1) / (b * a1 - b1 * a),
		yint = (b * (xint - x)) / a + y;
	return [xint, yint];
}

function checker([ax, ay], [bx, by], [goalx, goaly]) {
	(goalx += 10000000000000), (goaly += 10000000000000);

	if (goalx % gcd(ax, bx) !== 0 || goaly % gcd(ay, by) !== 0) return 0;
	let intercept = findIntercept(dioph(ax, bx, goalx), dioph(ay, by, goaly));

	let int = intercept.map(n => {
		return (n * 1000) % 1000 >= 999 || (n * 1000) % 1000 < 1
			? Math.round(n)
			: -1;
	});
	return int.every(n => n >= 0 && Number.isInteger(n))
		? int[0] * 3 + int[1]
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
