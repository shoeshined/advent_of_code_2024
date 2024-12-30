import { readFileSync } from "fs";

function prune(n) {
	return ((n % 16777216) + 16777216) % 16777216;
}

function hash(n, times) {
	let list = [n % 10];
	for (let i = 0; i < times; i++) {
		n = prune((n * 64) ^ n);
		n = prune(Math.floor(n / 32) ^ n);
		n = prune((n * 2048) ^ n);
		list.push(n % 10);
	}
	return list;
}

const input = readFileSync(import.meta.dirname + "/day22-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(x => parseInt(x));

const map = new Map();

input.forEach(line => {
	const reached = new Set();
	const hashed = hash(line, 2000).map((x, i, array) => {
		if (i) return [x, x - array[i - 1]];
		return [x, null];
	});

	for (let i = 4; i < hashed.length; i++) {
		let y = [3, 2, 1, 0].map(j => hashed[i - j][1]).join("");
		if (!reached.has(y)) {
			reached.add(y);
			map.set(y, map.get(y) + hashed[i][0] || hashed[i][0]);
		}
	}
});

const results = Math.max(...map.values());

console.log(results);
