const mathJs = require('mathjs');

module.exports = `

// RUNTIME FUNCTIONS
function write(...args) {
    console.log(...args)
}

function math (...args) {
    return eval(args.join(" "))
}

function concat (...args) {
    return args.join("")
}

function eq(x, y) {
    return x === y;
}

function $if(cond, consequent, alternate) {
    if (cond) {
        return consequent();
    } else {
        return alternate();
    }
}

`