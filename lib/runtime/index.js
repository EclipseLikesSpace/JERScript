const mathJs = require('mathjs');
const fs = require('fs')

module.exports = `// RUNTIME FUNCTIONS
// DO NOT EDIT PAST THIS POINT
// UNLESS YOU KNOW WHAT YOU ARE DOING
const mathjs = require('mathjs');
const fs = require('fs');

// ETC FUNCTIONS //

function write(...args) {
    console.log(...args);
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
    return args.join("");
}

function self(me) {
    return me;
}

// END ETC FUNCTIONS //

// MATH FUNCTIONS //

function math(...args) {
    return mathjs.evaluate(args.join(""));
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

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min + 1) + min;
}

function floor(floored){
    return Math.floor(floored);
}

function ceil(ceiled){
    return Math.ceil(ceiled);
}

function round(rounded){
    return Math.round(rounded);
}

function sqrt(i){
    return Math.sqrt(i);
}

function abs(i){
    return Math.abs(i);
}

function sin(i){
    return Math.sin(i);
}

function cos(i){
    return Math.cos(i);
}

function tan(i){
    return Math.tan(i);
}

function asin(i){
    return Math.asin(i);
}

function acos(i){
    return Math.acos(i);
}

// END MATH FUNCTIONS //

// LOGIC FUNCTIONS //

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

function $while(cond, func) {
    while (cond) {
        func();
    }
}
// END LOGIC FUNCTIONS //

// ARRAY FUNCTIONS //

function split(string, delimiter) {
    return string.split(delimiter);
}

function each(array, func) {
    for (let i = 1; i < array.length; i++) {
        func(array[i]);
    }
    return func(array[i]);
}

function getValueFromIndex(array, index) {
    return array[index];
}

function getArrayLength(array) {
    return array.length;
}

function push(array, value) {
    array.push(value);
    return 0;
}

function eject(array, index) {
    if (!index) { array.pop(); } else { array.splice(index, 1); }
    return 0;
}

// END ARRAY FUNCTIONS//
//----END RUNTIME FUNCTIONS----//`;