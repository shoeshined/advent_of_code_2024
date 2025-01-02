import { readFileSync } from "fs";

function adderFix(gates) {
	const swtiched = new Set();
	let c = gates.find(g => /(?=.*x00)(?=.*AND)(?=.*y00)/.test(g[0].join()))[1];

	for (let i = 1; i < 45; i++) {
		const string = i.toLocaleString("en-US", {
			minimumIntegerDigits: 2,
		});
		const [x, y, z] = ["x" + string, "y" + string, "z" + string];

		let hold1 = gates.find(gate =>
			RegExp(`(?=.*${x})(?=.*AND)(?=.*${y})`).test(gate[0].join())
		)[1];

		let hold2 = gates.find(gate =>
			RegExp(`(?=.*${x})(?=.*XOR)(?=.*${y})`).test(gate[0].join())
		)[1];

		let zgate = gates.find(gate => gate[1] === z && gate[0].includes("XOR"));

		if (!zgate) {
			let zgate1 = gates.find(
				gate => gate[0].includes(hold2) && gate[0].includes("XOR")
			);
			swtiched.add(z).add(zgate1[1]);
			zgate = zgate1;
		}

		if (!zgate[0].includes(hold2)) {
			let temp = zgate[0].find(h => h !== c && h !== "XOR");
			swtiched.add(hold2).add(temp);
			hold2 = temp;
		}
		if (!zgate[0].includes(c)) {
			let temp = zgate[0].find(h => h !== hold2 && h !== "XOR");
			swtiched.add(c).add(temp);
			c = temp;
		}

		let hold3 = gates.find(gate =>
			RegExp(`(?=.*${c})(?=.*AND)(?=.*${hold2})`).test(gate[0].join())
		)?.[1];

		c = gates.find(gate =>
			RegExp(`(?=.*${hold1})(?=.*OR)(?=.*${hold3})`).test(gate[0].join())
		)?.[1];

		if (!c) {
			const [h1try, h3try] = [hold1, hold3].map(hold =>
				gates.find(gate => gate[0].includes(hold) && gate[0].includes("OR"))
			);

			if (!h1try) {
				c = h3try[1];
				swtiched
					.add(hold1)
					.add(h3try[0].find(h => h !== "OR" && h !== hold3));
			} else {
				c = h1try[1];
				swtiched
					.add(hold3)
					.add(h1try[0].find(h => h !== "OR" && h !== hold1));
			}
		}
	}
	return [...swtiched].sort().join();
}

const gates = readFileSync(import.meta.dirname + "/day24-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n")[1]
	.split("\r\n")
	.map(x => x.split(" -> ").map((x, i) => (i === 0 ? x.split(" ") : x)));

const results = adderFix(gates);
console.log(results);
