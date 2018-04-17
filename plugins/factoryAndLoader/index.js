const ModuleDependency = require("webpack/lib/dependencies/ModuleDependency");
const path = require('path');
class chunkCreate {
    apply(compiler) {
        compiler.plugin("normal-module-factory", function(nmf) {
            nmf.plugin("after-resolve", function(data, done) {
                // 在此你能够操作到经过处理的module的内容，包括loader列表
                // 如果结合loader插入模块，我们能够插入我们任何想要插入的东西，处理任何模块的返回接口
                // 本质上是与loader处理是一样的，也可以根据请求路径来决定到底处理哪一个请求的模块
                const dataLoaders = data.loaders;
                const firstLoader = dataLoaders[0];
                if (firstLoader&&firstLoader.loader === path.join(__dirname, "jsLoader.js"))
                    done(null, data);
                else{
                    data.loaders.unshift(path.join(__dirname, "jsLoader.js"));
                    data.loaders.unshift(path.join(__dirname, "loader.js"));
                    done(null, data);
                }
            });
        });
    }
}
module.exports = chunkCreate;