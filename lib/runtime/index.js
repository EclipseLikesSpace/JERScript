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
`