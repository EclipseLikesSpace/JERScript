const nearley = require("nearley");
const grammar = require("./../grammar");
const fs = require('fs');

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

module.exports = function(file) {
    if (!file) { throw new Error("Please specify the file"); }
    parser.feed(file);
    fs.writeFileSync('./log/ast.log', JSON.stringify(parser.results[0], null, 2));
    return parser.results;
}