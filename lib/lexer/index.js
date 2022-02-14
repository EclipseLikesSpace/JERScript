const moo = require('moo');

let lexer = moo.compile({
    ws: /[ \t]+/,
    comment: /\/\/.*/,
    newline: { match: /\n/, lineBreaks: true },
    identifier: /[a-zA-Z_][a-zA-Z0-9_]*/,
    number: /[0-9]+/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lparen: '(',
    rparen: ')',
    lbracket: '[',
    rbracket: ']',
    assign: '-',
    fatarrow: '->',
})

module.exports = lexer;

module.exports = lexer;