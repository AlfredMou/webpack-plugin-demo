const Chunk = require('webpack/lib/Chunk');
const ModulePlugin = require('../module/index');
const Entrypoint = require("webpack/lib/Entrypoint");
const GraphHelpers = require("webpack/lib/GraphHelpers");

class chunkCreate {
    apply(compiler) {
        const modulePlugin = new ModulePlugin();
        modulePlugin.apply(compiler);

        compiler.plugin('this-compilation', (compilation) => {
            compilation.plugin('seal', () => {
                const name = 'chunk-test';
                const chunk = compilation.addChunk(name);
                const module = modulePlugin.myModule;
                chunk.name = name;
                chunk.addModule(modulePlugin.myModule);
            });
        })
    }
}
module.exports = chunkCreate;