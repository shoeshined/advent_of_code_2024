import { readFileSync } from "fs";

function changeSigns(map) {
	return map.length === 0
		? []
		: map[0] === 0
		? [1, ...map.slice(1)]
		: map[0] === 1
		? [2, ...map.slice(1)]
		: [0, ...changeSigns(map.slice(1))];
}

const input = readFileSync("advent/2024/day7/day7-input.txt", {
	encoding: "utf-8",
})
	.trim()
	.split("\r\n")
	.map(line => line.split(": "));

let results = 0;

for (let [targ, numline] of input) {
	let nums = numline.split(" ").map(Number),
		map = nums.slice(1).map(() => 0);
	while (true) {
		let proc = nums.reduce((pre, cur, ind) => {
			return ind === 0 || map[ind - 1] === 0
				? cur + pre
				: map[ind - 1] === 1
				? cur * pre
				: parseInt(`${pre}${cur}`);
		}, 0);
		if (proc === parseInt(targ)) {
			results += proc;
			break;
		}
		if (map.every(x => x === 2)) break;
		map = changeSigns(map);
	}
}

console.log(results);
