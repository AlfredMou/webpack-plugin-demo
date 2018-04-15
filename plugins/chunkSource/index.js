const ReplaceSource = require('webpack-sources').ReplaceSource;

class chunkSource {
    apply(compiler) {
        compiler.plugin('this-compilation', (compilation, params) => {
			compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
                chunks.forEach((chunk) => {
                    chunk.files.forEach((file) => {
                        if (file.endsWith('.js')) {
                            const source = compilation.assets[file];
                            let content = compilation.assets[file].source();
                            content = this.replaceConsole(content);
                            // 注意使用ReplaceSource去处理原source，如果生成新的Source会出现map丢失的情况
                            const replaceSource = new ReplaceSource(source);
                            replaceSource.replace(0, source.size(), content);
                            compilation.assets[file] = replaceSource;
                        }
                    });
                });
                callback();
            });
        });
    }
    replaceConsole(value) {
        const replaceReg = /console.log\([^\)]*\)/g;
        return value.replace(replaceReg, '');
    }
}
module.exports = chunkSource;