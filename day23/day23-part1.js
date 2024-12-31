import { readFileSync } from "fs";

const input = readFileSync(import.meta.dirname + "/day23-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n");

const record = new Map();
input.forEach(line => {
	line.split("-").forEach((cpu, i, array) => {
		let lan = array[(i + 1) % 2];
		record.has(cpu)
			? record.get(cpu).add(lan)
			: record.set(cpu, new Set([lan]));
	});
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
