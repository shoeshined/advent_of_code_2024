import { readFileSync } from "fs";

function adderFix(gates) {
	let c = gates.find(g => {
		g[0].includes("x00") && g[0].includes("y00") && g[0].includes("AND");
	})[1];
	const swtiched = new Set();

	for (let i = 1; i < 45; i++) {
		let string = i.toLocaleString("en-US", {
			minimumIntegerDigits: 2,
		});
		let [x, y, z] = ["x" + string, "y" + string, "z" + string];
		let hold1 = gates.find(
			gate =>
				gate[0].includes(x) &&
				gate[0].includes(y) &&
				gate[0].includes("AND")
		)[1];

		let hold2 = gates.find(
			gate =>
				gate[0].includes(x) &&
				gate[0].includes(y) &&
				gate[0].includes("XOR")
		)[1];

		let zgate = gates.find(gate => gate[1] === z && gate[0].includes("XOR"));

		if (!zgate) {
			let zgate1 = gates.find(
				gate => gate[0].includes("XOR") && gate[0].includes(hold2)
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

		let hold3 = gates.find(
			gate =>
				gate[0].includes(zgate[0][0]) &&
				gate[0].includes(zgate[0][2]) &&
				gate[0].includes("AND")
		)?.[1];
		c = gates.find(
			gate =>
				gate[0].includes(hold1) &&
				gate[0].includes(hold3) &&
				gate[0].includes("OR")
		)?.[1];

		if (!c) {
			let h1try = gates.find(
					gate => gate[0].includes(hold1) && gate[0].includes("OR")
				),
				h3try = gates.find(
					gate => gate[0].includes(hold3) && gate[0].includes("OR")
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
	.split("\r\n\r\n")
	.map(x => x.split("\r\n"))[1]
	.map(x => x.split(" -> ").map((x, i) => (i === 0 ? x.split(" ") : x)));

const results = adderFix(gates);
console.log(results);
