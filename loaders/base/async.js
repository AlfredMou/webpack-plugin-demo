module.exports = function(source) {
    const regExp = /color:\s*[a-zA-Z]*;/g;
    source = source.replace(regExp, ($1, $2) => {
        return 'color: blue;';
    });
    const callback = this.async();
    console.log(this.resourcePath + ' is built',`\x1b[33m${new Date().getTime()}\x1b[37m`);
    setTimeout(() => {
        console.log(this.resourcePath + ' is built', `\x1b[33m${new Date().getTime()}\x1b[37m`);
        callback(null, source);
    }, 2000);
}