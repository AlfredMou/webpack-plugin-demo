const SingleEntryPlugin = require("webpack/lib/SingleEntryPlugin");
const path = require('path');

class chunkCreate {
    apply(compiler) {
        compiler.plugin('entry-option', (context) => {
            new SingleEntryPlugin(context, path.resolve(__dirname,'./etract.js'), 'chunck-test').apply(compiler);
        });
    }
}
module.exports = chunkCreate;