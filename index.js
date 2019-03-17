/*
	MIT License http://www.opensource.org/licenses/mit-license.php
*/
"use strict";
const {ConcatSource} = require("webpack-sources");
const comp = require("./component.json");

class SeaJsModulePlugin {

    constructor(options) {

    }

    _varToNormaPath(varName) {
        return varName.split("_").map((item, i) => {
            if (i === 1) {
                return '-' + item;
            }
            else if (i === 2) {
                return "/" + item;
            }
            else if (i === 3) {
                return '-' + item + '@';
            }
            else if (i === 5 || i === 6) {
                return '.' + item;
            }
            return item;
        }).join("")
    }

    apply(compiler) {

        compiler.hooks.thisCompilation.tap("SeaJsModulePlugin", compilation => {
            const {mainTemplate, chunkTemplate} = compilation;
            mainTemplate.hooks.renderWithEntry.tap("SeaJsModulePlugin", (source, chunk, hash) => {
                const externals = chunk.getModules().filter(m => m.external);
                const externalsArgs = externals.map(m => `"${this._varToNormaPath(m.request)}"`);
                let id = `${comp.group}/${comp.name}@${comp.version}`;
                const externalReqire = externals.map(m => {
                    return `var ${m.request} = require("${this._varToNormaPath(m.request)}");\n`
                })
                return new ConcatSource(`define("${id}",[${externalsArgs.length > 0 ? externalsArgs.join(",") : ""}],function(require, exports, module) {\n${externalReqire.join("")}module.exports = `, source, "});");
            })
        })
    }
}

module.exports = SeaJsModulePlugin;
