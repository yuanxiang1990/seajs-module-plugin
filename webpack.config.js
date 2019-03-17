const SeajsModulePlugin = require("./index");
const path = require("path");
module.exports = {
    mode: "development",
    entry: {
        test: "./test/index"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
       // libraryTarget: "amd",
        //library: "aaa"
    },
    externals: [
        function (context, request, callback) {
            if (/^fe\-\w+\/[\w-]+\@(\d+\.)*\d$/.test(request)) {
                return callback(null, 'cmd '+request.replace(/\/|\-|@|\./g,'_'));
            }
            callback();
        }],
    plugins: [
        new SeajsModulePlugin({})
    ]
};
