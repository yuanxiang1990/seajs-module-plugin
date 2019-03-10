/*
	MIT License http://www.opensource.org/licenses/mit-license.php
*/
"use strict";

class SeaJsModulePlugin {
    constructor(options) {

    }

    apply(compiler) {

        compiler.hooks.thisCompilation.tap("SeaJsModulePlugin",compilation=>{
            compilation.hooks.succeedModule.tap("SeaJsModulePlugin",(module)=>{
                module.dependencies.forEach((dep,i)=>{
                    if(dep.getResourceIdentifier()=='modulefe-common/utopia-cookie@0.0.1'){
                        module.dependencies.splice(i,1);
                    }
                })
            })
        })
    }
}

module.exports = SeaJsModulePlugin;
