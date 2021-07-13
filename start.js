const Folder = function (a = []) {
	if (!new.target) {
		return new Folder(a);
	}

	this.read = async (index) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return a[index];
	};
	this.size = async () => a.length;
};

const inputObj = Folder([
	"file",
	"ffffile",
	Folder(["file"]),
	Folder(["fiiile"]),
	Folder([{}, null, "file", "ffiillee", "ffiillee"]),
	Folder([Folder(["filllle", "file", null]), {}, Folder([])]),
]);

// const collection = [];

async function root(input) {
	const box = [];

	for (let i = 0; i <= ((await input.size()) || input.length); i++) {
		try {
			let item = input.read(i);
			box.push(item);
		} catch (err) {
			console.log(err);
		}
	}

	Promise.all(box).then((value) => {
		for (item of value) {
			if (typeof item === "string") {
				console.log(item);
			} else if (item instanceof Folder) {
				root(item);
			}
		}
	});
}
root(inputObj);
