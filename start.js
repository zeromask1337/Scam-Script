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
// const fsPromises = fs.promises;
let rootPath = "./";

//Checks if directory exists
const isDir = (dirPath) =>
	fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();

//Main function
const scamFinder = (startPath) => {
	let box = [];

	fs.readdir(startPath, function (err, files) {
		try {
			console.log("\x1b[33m%s\x1b[0m", "Opening folder on: ", startPath);
			// box.push(...[startPath + files]);
			iterator(box);
		} catch (err) {}
	});
};

const iterator = (plate) => {
	for (item of plate) {
		let fullPath = rootPath + item;
		//If item is folder then activate recursion, else console.log filename
		if (isDir(fullPath)) {
			console.log("\x1b[36m%s\x1b[0m", "Found folder on: ", fullPath);
			scamFinder(fullPath);
		} else {
			console.log("file: ", fullPath);
		}
		// console.log(fullPath);
	}
};

scamFinder(rootPath);
