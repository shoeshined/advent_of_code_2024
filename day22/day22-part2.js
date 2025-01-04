import { readFileSync } from "fs";

function prune(n) {
	return ((n % 16777216) + 16777216) % 16777216;
}

function hash(n, times, map) {
	let price = n % 10,
		key = [],
		reached = new Set();

	for (let i = 0; i < times; i++) {
		n = prune((n * 64) ^ n);
		n = prune(Math.floor(n / 32) ^ n);
		n = prune((n * 2048) ^ n);
		key.push((n % 10) - price);
		price = n % 10;

		if (i > 2) {
			let y = key.slice(-4).join("");
			if (!reached.has(y)) {
				reached.add(y);
				map.set(y, price + (map.get(y) ?? 0));
			}
		}
	}
	return map;
}

const input = readFileSync(import.meta.dirname + "/day22-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(x => parseInt(x));

const map = input.reduce((prev, line) => hash(line, 2000, prev), new Map());

const results = Math.max(...map.values());

console.log(results);
