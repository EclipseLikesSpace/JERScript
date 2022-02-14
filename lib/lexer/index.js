const moo = require('moo');

let lexer = moo.compile({
    ws: /[ \t]+/,
    comment: /\/\/.*/,
    identifier: /[a-zA-Z_][a-zA-Z0-9_]*/,
    number: /[0-9]+/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lparen: '(',
    rparen: ')',
    lbracket: '[',
    rbracket: ']',
    assign: '-',
    longarrow: '->',
    newline: { match: /[\n]+/, lineBreaks: true },
})

module.exports = lexer;