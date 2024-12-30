import { readFileSync } from "fs";

function prune(n) {
	return ((n % 16777216) + 16777216) % 16777216;
}

function hash(n, times) {
	for (let i = 0; i < times; i++) {
		n = prune((n * 64) ^ n);
		n = prune(Math.floor(n / 32) ^ n);
		n = prune((n * 2048) ^ n);
	}
	return n;
}

const input = readFileSync(import.meta.dirname + "/day22-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(x => parseInt(x));

const results = input.reduce((y, x) => y + hash(x, 2000), 0);

console.log(results);
