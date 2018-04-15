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
            compilation.plugin('optimize-chunks', () => {
                const chunk = compilation.chunks[0];
                chunk.addModule(this.myModule);
                this.myModule.addChunk(chunk);
            });
        });
        compiler.plugin('make', (compilation, callback) => {
            const dep = new MyModuleDependency(path.resolve(__dirname,'./etract.js'));
            //console.log(this);
            compilation._addModuleChain(this.context ,dep ,(module) => {
                this.myModule = module;
            }, (err, module) => {
                callback();
            });
        });

    }
}
module.exports = chunkCreate;