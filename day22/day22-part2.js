import { readFileSync } from "fs";

function prune(n) {
	return ((n % 16777216) + 16777216) % 16777216;
}

function hash(n, times, map) {
	let list = [[n % 10, 0]],
		key = [],
		reached = new Set();

	for (let i = 0; i < times; i++) {
		n = prune((n * 64) ^ n);
		n = prune(Math.floor(n / 32) ^ n);
		n = prune((n * 2048) ^ n);
		list.push([n % 10, (n % 10) - list.at(-1)[0]]);
		key.push(list.at(-1)[1]);

		if (i > 3) {
			let y = key.slice(-4).join("");
			if (!reached.has(y)) {
				reached.add(y);
				map.set(y, map.get(y) + (n % 10) || n % 10);
			}
		}
	}
}

const input = readFileSync(import.meta.dirname + "/day22-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(x => parseInt(x));

const map = new Map();
input.forEach(line => hash(line, 2000, map));

const results = Math.max(...map.values());

console.log(results);
