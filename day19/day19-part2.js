import { readFileSync } from "fs";

function checker(partPat, tows, cashe) {
	if (!partPat.length) return 1;
	if (cashe.has(partPat)) return cashe.get(partPat);

	const count = tows
		.map(towel => {
			return partPat.startsWith(towel)
				? checker(partPat.substring(towel.length), tows, cashe)
				: 0;
		})
		.reduce((y, x) => y + x, 0);

	cashe.set(partPat, count);
	return count;
}

const [tows, paterns] = readFileSync(import.meta.dirname + "/day19-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n")
	.map(line => line.match(/[a-z]+/g));

const cashe = new Map();
const results = paterns.reduce((y, pat) => y + checker(pat, tows, cashe), 0);

console.log(results);
