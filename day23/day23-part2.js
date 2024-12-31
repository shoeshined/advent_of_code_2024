import { readFileSync } from "fs";

function connections(set, loops, keys) {
	for (let key of set.values()) {
		if (done.has(key)) continue;
		let newInter = record.get(key).intersection(set);
		let potential = newInter.size + keys.length + 1;
		if (potential > size) {
			if (newInter.size === 1) {
				loops.add([...keys, ...newInter.keys(), key].sort().join());
				size = potential;
			} else connections(newInter, loops, [...keys, key]);
		}
	}
}

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

const loops = new Set(),
	done = new Set();
let size = 0;
Array.from(record.keys()).forEach((key, i, array) => {
	for (let j = 0; j + i < array.length; j++) {
		if (record.get(array[j + i]).isSubsetOf(done)) {
			done.add(array[j + i]);
			continue;
		}
		if (record.get(key).has(array[j + i])) {
			connections(
				record.get(key).intersection(record.get(array[j + i])),
				loops,
				[key, array[j + i]]
			);
		}
	}
	done.add(key);
});

let results = Array.from(loops.keys()).sort(
	(a, b) => b.split(",").length - a.split(",").length
);

console.log(results[0]);
