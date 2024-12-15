import { readFileSync } from "fs";

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
let [q1, q2, q3, q4] = [0, 0, 0, 0];

input.forEach(([x1, y1, vx, vy]) => {
	const [x, y] = [mod(x1 + vx * 100, w), mod(y1 + vy * 100, h)],
		[halfx, halfy] = [Math.floor(w / 2), Math.floor(h / 2)];
	if (x < halfx) y < halfy ? q1++ : y > halfy ? q2++ : (q1 += 0);
	if (x > halfx) y < halfy ? q3++ : y > halfy ? q4++ : (q4 += 0);
});

const results = q1 * q2 * q3 * q4;

console.log(results);
