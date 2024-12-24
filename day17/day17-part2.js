import { readFileSync } from "fs";

function combo(n, a, b, c) {
	return n === 4 ? a : n === 5 ? b : n === 6 ? c : n;
}

const input = readFileSync(import.meta.dirname + "/day17-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n")
	.map(line => line.match(/\d+/g).map(n => parseInt(n)));

const [[_, bstart, cstart], program] = input;
let init = 8 ** 15;

for (let i = 14; i >= 0; i--) {
	let log;
	while (true) {
		let [a, b, c] = [init, bstart, cstart];
		log = [];
		for (let p = 0; p < program.length; ) {
			let code = program[p],
				oper = program[p + 1];
			switch (code) {
				case 0:
					a = Math.trunc(a / 2 ** combo(oper, a, b, c));
					break;
				case 1:
					b = Number(BigInt(b) ^ BigInt(oper));
					break;
				case 2:
					b = combo(oper, a, b, c) % 8;
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
					log.push(combo(oper, a, b, c) % 8);
					break;
				case 6:
					b = Math.trunc(a / 2 ** combo(oper, a, b, c));
					break;
				case 7:
					c = Math.trunc(a / 2 ** combo(oper, a, b, c));
					break;
			}
			p += 2;
		}
		if (log.slice(i).toString() === program.slice(i).toString()) break;
		init += 8 ** i;
	}
	if (log.toString() === program.toString()) break;
}

console.log(init);
