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

function numloop(code, rep, times = 0, prev = "", start = "A", first = true) {
	if (!code.length) return prev;
	if (times > rep) return code;

	const begin = !times ? numplace(start) : dirplace(start),
		dest = !times ? numplace(code[0]) : dirplace(code[0]);

	let [x, y] = [...begin],
		print = [];

	while (x !== dest[0]) {
		if (x > dest[0]) {
			print.push("<");
			x--;
		} else {
			print.push(">");
			x++;
		}
	}
	while (y !== dest[1]) {
		if (y > dest[1]) {
			print.push("v");
			y--;
		} else {
			print.push("^");
			y++;
		}
	}

	if (
		(!times && begin[1] === 0 && dest[0] === 0) ||
		(times && dest.toString() === "0,0") ||
		((times || begin[0] !== 0 || dest[1] !== 0) &&
			(!times || begin.toString() !== "0,0") &&
			print[0] === ">")
	)
		print = print.toReversed();

	const options = numloop(
		code.substring(1),
		rep,
		times,
		[prev, ...print, "A"].join(""),
		code[0],
		false
	);

	if (!first) return options;
	return numloop(options, rep, times + 1);
}

function expander(elList, patMatch, loopGoal = 1, loops = 0) {
	if (loops >= loopGoal) return elList;
	const expanded = new Map();
	elList.forEach((val, elm) => {
		patMatch.get(elm).forEach((val2, elm2) => {
			expanded.set(elm2, expanded.get(elm2) + val2 * val || val2 * val);
		});
	});
	return expander(expanded, patMatch, loopGoal, loops + 1);
}

const input = readFileSync(import.meta.dirname + "/day21-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n");

const patMatch = new Map();

numloop(input[0], 3)
	.match(/[^A]*A/g)
	.forEach(s => {
		patMatch.set(s);
	});

patMatch.forEach((_, s) => {
	const expand = new Map();
	numloop(s, 1, 1)
		.match(/[^A]*A/g)
		.forEach(t => {
			expand.set(t, expand.get(t) + 1 || 1);
		});
	patMatch.set(s, expand);
});

const results = input.reduce((count, line) => {
	const firstStep = new Map();
	numloop(line, 2)
		.match(/[^A]*A/g)
		.forEach(t => {
			firstStep.set(t, firstStep.get(t) + 1 || 1);
		});

	return (
		count +
		parseInt(line.match(/\d+/)) *
			expander(firstStep, patMatch, 23)
				.entries()
				.reduce((prev, [key, val]) => prev + key.length * val, 0)
	);
}, 0);

console.log(results);
