
class chunkTemplate {
    apply(compiler) {
        compiler.plugin('this-compilation', (compilation, params) => {
            // 除了mainTemplate也有moduleTemplate可以供监听，Module的最终静态代码的生成；
            compilation.mainTemplate.plugin('startup', (source, chunk, hash) => {
                // 实际上在这里你可以获取到创建的模块id强制调用一下引入的模块;
                const insertSource = [
                    'console.log("insert code to chunk entry");',
                    'console.log("some code");\n',
                ].join('\n');
                source = insertSource + source;
                return source;
            });
        });
    }
}
module.exports = chunkTemplate;