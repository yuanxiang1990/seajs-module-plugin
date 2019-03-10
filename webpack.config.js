const SeajsModulePlugin = require("./index");
const path = require("path");
module.exports = {
	mode: "development",
	entry: {
		test: "./test/index"
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].bundle.js"
	},
	plugins: [
		new SeajsModulePlugin({
		})
	]
};
