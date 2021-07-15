// const Folder = function (a = []) {
// 	if (!new.target) {
// 		return new Folder(a);
// 	}

// 	this.read = async (index) => {
// 		await new Promise((resolve) => setTimeout(resolve, 1000));
// 		return a[index];
// 	};
// 	this.size = async () => a.length;
// };

// const inputObj = Folder([
// 	"file",
// 	"ffffile",
// 	Folder(["file"]),
// 	Folder(["fiiile"]),
// 	Folder([{}, null, "file", "ffiillee", "ffiillee"]),
// 	Folder([Folder(["filllle", "file", null]), {}, Folder([])]),
// ]);

// // const collection = [];

// async function root(input) {
// 	const box = [];

// 	for (let i = 0; i <= ((await input.size()) || input.length); i++) {
// 		try {
// 			let item = input.read(i);
// 			box.push(item);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}

// 	Promise.all(box).then((value) => {
// 		for (item of value) {
// 			if (typeof item === "string") {
// 				console.log(item);
// 			} else if (item instanceof Folder) {
// 				root(item);
// 			}
// 		}
// 	});
// }
// root(inputObj);

const fs = require("fs");
const path = require('path')
let rootPath = "./";

//Checks if directory exists
const isDir = (dirPath) =>
	fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();

//Main function
const scamFinder = (dir) => {
	let box = [];

	fs.readdir(dir, function (err, list) {
		if (err) throw err;
		
		console.log("\x1b[33m%s\x1b[0m", "Opening folder: ", dir);
		for (file of list) {
			file = path.resolve(dir, file);

		}
		box.push(...list);
		iterator(box);
		
	});
};

const iterator = (plate) => {
	for (item of plate) {
		let fullPath = rootPath + item;
		//If item is folder then activate recursion, else console.log filename
		if (isDir(fullPath)) {
			console.log("\x1b[36m%s\x1b[0m", "    Folder: ", fullPath);
			scamFinder(fullPath);
		} else {
			console.log("    file: ", fullPath);
		}
		// console.log(fullPath);
	}
};

scamFinder(rootPath);

// https://ourcodeworld.com/articles/read/420/how-to-read-recursively-a-directory-in-node-js
