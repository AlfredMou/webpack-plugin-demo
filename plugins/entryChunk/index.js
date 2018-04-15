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
        compiler.plugin('entry-option', (context) => {
            this.context = context;
        });
        compiler.plugin('compilation', (compilation, params) => {
			const normalModuleFactory = params.normalModuleFactory;
            compilation.dependencyFactories.set(MyModuleDependency, normalModuleFactory);
        });
        compiler.plugin('make', (compilation, callback) => {
            const dep = new MyModuleDependency(path.resolve(__dirname,'./etract.js'));
            //console.log(this);
            compilation.addEntry(this.context ,dep , 'chunk-test', (err, module) => {
                callback();
            });
        });

    }
}
module.exports = chunkCreate;