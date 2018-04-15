module.exports = function(source) {
    // console.log('---loader B');
    return [
        'console.log("b loader module");',
        `module.exports={
            source: ${JSON.stringify(source)},
        }`,
    ].join('\n');
}