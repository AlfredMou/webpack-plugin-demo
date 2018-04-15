const ModuleDependency = require("webpack/lib/dependencies/ModuleDependency");
const path = require('path');
const getAllModules = require('./getAllModules');

class chunkCreate {
    apply(compiler) {
        compiler.plugin('entry-option', (context) => {
            this.context = context;
        });
        compiler.plugin('this-compilation', (compilation, params) => {
			compilation.plugin('after-optimize-chunks', (chunks) => {
                // 此处只给予演示，类似于去除console.log这种功能最好还是放到loader中解决
                // 这种方式主要用于loader过程中无法处理，之后又需要处理module中的内容
                // 注意这个时候source已经经过loader和parse的处理，依赖引入的代码是无效的
                const allModules = getAllModules(compilation);
                allModules.forEach((module) => {
                    const source = module._source;
                    if (typeof source === 'string') {
                        module._source = this.replaceConsole(source);
                    } else if (typeof source === 'object' && typeof source._value === 'string') {
                        source._value =  this.replaceConsole(source._value);
                    }
                });
            });
            compilation.plugin('optimize-extracted-chunks', (chunks) => {
                // 这是extract-text-webpack-plugin等会引入额外chunks的plugin的兼容
                chunks.forEach((chunk) => {
                    const modules = !chunk.mapModules ? chunk._modules : chunk.mapModules();
                    modules.filter((module) => '_originalModule' in module).forEach((module) => {
                        const source = module._source;
                        if (typeof source === 'string') {
                            module._source = this.replaceConsole(source);
                        } else if (typeof source === 'object' && typeof source._value === 'string') {
                            source._value =  this.replaceConsole(source._value);
                        }
                    });
                });
            });
        });
    }
    replaceConsole(value) {
        const replaceReg = /console.log\([^\)]*\)/g;
        return value.replace(replaceReg, '');
    }
}
module.exports = chunkCreate;