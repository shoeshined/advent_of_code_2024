import { readFileSync } from "fs";

const input = readFileSync(import.meta.dirname + "/day25-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n")
	.map(x => x.split("\r\n").map(x => x.split("")));

const [locks, keys] = [[], []];
for (let chart of input) {
	const numer = chart[0].map((_, i) => {
		return chart.reduce((y, x) => y + (x[i] === "#"), 0);
	});
	if (chart[0][0] === "#") locks.push(numer);
	else keys.push(numer);
}

let results = 0;
for (let lock of locks) {
	keyloop: for (let key of keys) {
		for (let i = 0; i < key.length; i++) {
			if (lock[i] + key[i] > input[0].length) continue keyloop;
		}
		results++;
	}
}

console.log(results);
