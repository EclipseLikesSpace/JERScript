const mathJs = require('mathjs');

module.exports = `// RUNTIME FUNCTIONS
// DO NOT EDIT PAST THIS POINT
// UNLESS YOU KNOW WHAT YOU ARE DOING
const mathjs = require('mathjs');
const pi = 3.141592653589793;

function write(...args) {
    console.log(...args);
}

function math(...args) {
    return mathjs.evaluate(args.join(""))
}

function evaluate(x, y, args) {
    switch (args) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            return x / y;
        case '%':
            return x % y;
        case '**':
            return Math.pow(x, y);
        case '>':
            return x > y;
        case '<':
            return x < y;
        case '>=':
            return x >= y;
        case '<=':
            return x <= y;
    }
}

function cases(x, y, args) {
    switch (args) {
        case '==':
            return x == y;
        case '!=':
            return x != y;
        case '&&':
            return x && y;
        case '||':
            return x || y;
        case '!':
            return !x;
    }
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

function repeat(times, func) {
    for (let i = 1; i < times; i++) {
        func();
    }
    return func();
}
//----END RUNTIME FUNCTIONS----//`