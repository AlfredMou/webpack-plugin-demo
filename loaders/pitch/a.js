const  loaderUtils = require("loader-utils");
module.exports = function () {
    // console.log('---loader A');
};
module.exports.pitch = function(request) {
    return [
        `const moduleB = require(${loaderUtils.stringifyRequest(this, "!" + request)})`,
        'console.log("a loader module");'
    ].join('\n');
}
