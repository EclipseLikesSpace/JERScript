const moo = require('moo');

let lexer = moo.compile({
    ws: /[ \t]+/,
    comment: /\/\/.*/,
    identifier: /[a-zA-Z_][a-zA-Z0-9_]*/,
    number: /[0-9]+/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    var_type: ['global', 'local', 'const'],
    lparen: '(',
    rparen: ')',
    comma: ',',
    lbracket: '[',
    rbracket: ']',
    lbrace: '{',
    rbrace: '}',
    longarrow: '->',
    assign: '-',
    newline: { match: /[\n\r]+/, lineBreaks: true },
})

module.exports = lexer;