import { readFileSync } from "fs";

function checker(ax, ay, bx, by, goalx, goaly) {
	for (let a = 0; a <= 100; a++) {
		for (let b = 0; b <= 100; b++) {
			if (a * ax + b * bx === goalx && a * ay + b * by === goaly)
				return 3 * a + b;
		}
	}
	return 0;
}

const input = readFileSync(import.meta.dirname + "/day13-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n\r\n")
	.map(block => block.match(/[0-9]+/g).map(x => parseInt(x)))
	.reduce((prev, block) => prev + checker(...block), 0);

console.log(input);
