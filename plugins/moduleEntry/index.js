const ModuleDependency = require("webpack/lib/dependencies/ModuleDependency");
const path = require('path');

class MyModuleDependency extends ModuleDependency {
	constructor(request) {
		super(request);
	}

	get type() {
		return "my module";
	}
}

class chunkCreate {
    apply(compiler) {
        const addStylePath = path.resolve(__dirname, './etract.js');
        function entryCallBack(entry) {
            function addStyleModuleToEntry(entry) {
                let result;
                if (typeof entry === 'string') {
                    result = [addStylePath, entry];
                } else if (Array.isArray(entry)) {
                    entry.unshift(addStylePath);
                    result = entry;
                }
                return result;
            }
            if (typeof entry === 'string' || Array.isArray(entry)) {
                return addStyleModuleToEntry(entry);
            } else if (typeof entry === 'object') {
                const result = {};
                for (const name of Object.keys(entry)) {
                    result[name] = addStyleModuleToEntry(entry[name]);
                }
                return result;
            }
        }
        compiler.plugin('environment', (context) => {
            const entry = compiler.options.entry;
            if (typeof entry === 'string' || Array.isArray(entry)) {
                compiler.options.entry = entryCallBack(entry);
            } else if (typeof entry === 'object') {
                compiler.options.entry = entryCallBack(entry);
            } else if (typeof entry === 'function') {
                compiler.options.entry = function () {
                    return Promise.resolve(entry()).then((entry) => entryCallBack(entry));
                };
            }
        });
    }
}
module.exports = chunkCreate;