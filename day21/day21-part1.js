import { readFileSync } from "fs";

function numplace(n) {
	if (n === "A") return [2, 0];
	n = parseInt(n);
	if (n === 0) return [1, 0];
	return [(n - 1) % 3, Math.ceil(n / 3)];
}

function dirplace(n) {
	return n === "A"
		? [2, 1]
		: n === "^"
		? [1, 1]
		: n === "<"
		? [0, 0]
		: n === "v"
		? [1, 0]
		: [2, 0];
}

function numloop(code, prev = "", times = 0, start = "A", first = true) {
	if (!code.length) return prev;
	if (times > 2) return code.length;

	const begin = !times ? numplace(start) : dirplace(start),
		dest = !times ? numplace(code[0]) : dirplace(code[0]);

	let [x, y] = [...begin],
		print = [[]];

	while (x !== dest[0]) {
		if (x > dest[0]) {
			print[0].push("<");
			x--;
		} else {
			print[0].push(">");
			x++;
		}
	}
	while (y !== dest[1]) {
		if (y > dest[1]) {
			print[0].push("v");
			y--;
		} else {
			print[0].push("^");
			y++;
		}
	}
	if (
		(times || begin[0] !== 0 || dest[1] !== 0) &&
		(!times || begin[0] !== 0 || begin[1] !== 0) &&
		begin[0] !== dest[0] &&
		begin[1] !== dest[1]
	) {
		print.push([...print[0].toReversed(), "A"]);
	}
	print[0].push("A");
	if (
		(!times && begin[1] === 0 && dest[0] === 0) ||
		(times && dest[0] === 0 && dest[1] === 0 && begin[1] === 1)
	) {
		print.shift();
	}

	const options = print.flatMap(itter =>
		numloop(
			code.substring(1),
			[prev, ...itter].join(""),
			times,
			code[0],
			false
		)
	);

	if (!first) return options;
	return Math.min(
		...options.flatMap(newcode => numloop(newcode, "", times + 1))
	);
}

const input = readFileSync(import.meta.dirname + "/day21-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n");

let results = input.reduce((pre, cur) => {
	return pre + numloop(cur, "") * parseInt(cur.match(/[0-9]+/));
}, 0);

console.log(results);
