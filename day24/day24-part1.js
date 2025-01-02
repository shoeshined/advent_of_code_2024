import { readFileSync } from "fs";

const [init, comands] = readFileSync(import.meta.dirname + "/day24-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n")
	.map(x => x.split("\r\n"));

const states = new Map(init.map(x => x.split(": "))),
	gates = comands.map(x => x.match(/[^-> ]+/g));

for (let gate of gates) {
	if (!states.has(gate[0]) || !states.has(gate[2])) {
		gates.push(gate);
		continue;
	}
	let [in0, in1] = [states.get(gate[0]), states.get(gate[2])];
	let x =
		gate[1] === "AND" ? in0 & in1 : gate[1] === "OR" ? in0 | in1 : in0 ^ in1;
	states.set(gate[3], x);
}

let results = [...states]
	.filter(x => x[0].startsWith("z"))
	.sort()
	.reduce((pre, x, i) => pre + x[1] * 2 ** i, 0);

console.log(results);
