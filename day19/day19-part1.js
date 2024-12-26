import { readFileSync } from "fs";

function checker(de) {
	if (!de.length) return true;
	for (let j = 1; j <= de.length; j++) {
		for (const tow of tows) {
			if (de.substring(0, j) === tow && checker(de.substring(j)))
				return true;
		}
	}
	return false;
}

const [tows, des] = readFileSync(import.meta.dirname + "/day19-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n")
	.map(line => line.match(/[a-z]+/g));

const results = des.map(de => checker(de)).reduce((y, x) => y + (x ? 1 : 0), 0);

console.log(results);
