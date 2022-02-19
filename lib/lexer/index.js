const moo = require('moo');

let lexer = moo.compile({
    // Whitespace & comments
    ws: /[ \t]+/,
    comment: /\/\/.*/,

    // Types
    identifier: /[a-zA-Z_][a-zA-Z0-9_]*/,
    number: /[0-9]+/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,

    // Keywords
    var_type: ['set', 'local', 'const',],
    boolean: /true|false/,
    null: /null/,
    undefined: /undefined/,
    break: 'break',

    // Useful stuff, like operators
    lparen: '(',
    rparen: ')',
    lbracket: '[',
    rbracket: ']',
    lbrace: '{',
    rbrace: '}',
    longarrow: '->',
    colon: ":",
    assign: '=',
    newline: { match: /[\n\r]+/, lineBreaks: true },
})

module.exports = lexer;