import { readFileSync } from "fs";

function connect(input) {
	const record = new Map();
	input.map(line => {
		let [a, b] = line.split("-");
		record.set(a, record.get(a)?.add(b) ?? new Set([b]));
		record.set(b, record.get(b)?.add(a) ?? new Set([a]));
	});
	return record;
}

function dfConnect(record) {
	let loops = new Map(record);
	while (loops.size > 1) {
		loops = new Map(
			loops.entries().flatMap(([x, set]) => {
				return set.keys().map(y => {
					return [
						[...x.split(","), y].sort().join(),
						record.get(y).intersection(set),
					];
				});
			})
		);
	}
	return Array.from(loops.keys())[0];
}

const input = readFileSync(import.meta.dirname + "/day23-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n");

let results = dfConnect(connect(input));

console.log(results);
