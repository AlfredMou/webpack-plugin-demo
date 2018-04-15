module.exports = function(source) {
    const regExp = /color:\s*[a-zA-Z]*;/g;
    source = source.replace(regExp, ($1, $2) => {
        return 'color: blue;';
    })
    return source;
}