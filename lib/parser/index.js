const nearley = require("nearley");
const grammar = require("./../grammar");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

module.exports = function(file) {
    if (!file) { throw new Error("Please specify the file"); }
    parser.feed(file);
    return parser.results;
}