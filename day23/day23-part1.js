import { readFileSync } from "fs";

const input = readFileSync(import.meta.dirname + "/day23-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n");

const record = new Map();
input.forEach(line => {
	let [a, b] = line.split("-");
	record.set(a, record.get(a)?.add(b) ?? new Set([b]));
	record.set(b, record.get(b)?.add(a) ?? new Set([a]));
});

const loops = new Set();
record.forEach((set, key) => {
	if (key.startsWith("t")) {
		set.forEach(lan => {
			let both = record.get(lan).intersection(set);
			both.forEach(loop => loops.add([loop, lan, key].sort().join()));
		});
	}
});

let results = loops.size;

console.log(results);
