const Chunk = require('webpack/lib/Chunk');
class chunkCreate {
    apply(compiler) {
        compiler.plugin('this-compilation', (compilation) => {
            // compilation.plugin('additional-assets', (done) => {
            //     const chunk = new Chunk('createChunk');
            //     chunk.ids = [];
            //     compilation.chunks.push(chunk);
            //     done();
            // });
            compilation.plugin('seal', () => {
                compilation.addChunk('chunk test');
                //done();
            });
        })
    }
}
module.exports = chunkCreate;