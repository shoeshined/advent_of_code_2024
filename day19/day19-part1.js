import { readFileSync } from "fs";

function checker(de) {
	if (!de.length) return true;

	for (const tow of tows) {
		if (de.startsWith(tow) && checker(de.substring(tow.length))) return true;
	}
	return false;
}

const [tows, des] = readFileSync(import.meta.dirname + "/day19-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n")
	.map(line => line.match(/[a-z]+/g));

const results = des.reduce((prev, de) => prev + (checker(de) ? 1 : 0), 0);

console.log(results);
