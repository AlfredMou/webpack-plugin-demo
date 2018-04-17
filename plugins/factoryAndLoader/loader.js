const  loaderUtils = require("loader-utils");
module.exports = function (source) {
    return source;
};
module.exports.pitch = function(request) {
    return [
        `const moduleB = require(${loaderUtils.stringifyRequest(this, "!" + request)})`,
        'console.log("a loader module我可以对所有模块做任何我想做的事情");',
        `module.exports = moduleB`,
    ].join('\n');
}