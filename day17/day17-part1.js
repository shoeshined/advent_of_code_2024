import { readFileSync } from "fs";

function combo(n) {
	return n === 4 ? a : n === 5 ? b : n === 6 ? c : n;
}

const input = readFileSync(import.meta.dirname + "/day17-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n")
	.map(line => line.match(/\d+/g).map(n => parseInt(n)));

let [[a, b, c], program] = input,
	results = [];

for (let p = 0; p < program.length; ) {
	let code = program[p],
		oper = program[p + 1];
	switch (code) {
		case 0:
			a = Math.trunc(a / 2 ** combo(oper));
			break;
		case 1:
			b = Number(BigInt(b) ^ BigInt(oper));
			break;
		case 2:
			b = combo(oper) % 8;
			break;
		case 3:
			if (a) {
				p = oper;
				continue;
			}
			break;
		case 4:
			b = Number(BigInt(b) ^ BigInt(c));
			break;
		case 5:
			results.push(combo(oper) % 8);
			break;
		case 6:
			b = Math.trunc(a / 2 ** combo(oper));
			break;
		case 7:
			c = Math.trunc(a / 2 ** combo(oper));
			break;
	}
	p += 2;
}

console.log(results.join(","));
