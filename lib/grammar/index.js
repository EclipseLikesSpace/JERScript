// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const myLexer = require("./../lexer")
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "statements", "symbols": ["statement"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "statements", "symbols": ["statements", (myLexer.has("newline") ? {type: "newline"} : newline), "statement"], "postprocess": 
        (data) => {
            return [...data[0], data[2]];
        }
                },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["fun_call"], "postprocess": id},
    {"name": "var_assign", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("assign") ? {type: "assign"} : assign), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[0],
                var_value: data[4]
            }
        }
                },
    {"name": "fun_call$ebnf$1$subexpression$1", "symbols": ["arg_list", "_"]},
    {"name": "fun_call$ebnf$1", "symbols": ["fun_call$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "fun_call$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "fun_call", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("lparen") ? {type: "lparen"} : lparen), "_", "fun_call$ebnf$1", (myLexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => {
            return {
                type: "fun_call",
                fun_name: data[0],
                arguments: data[4] ? data[4][0]: []
            }
        }
                },
    {"name": "fun_call", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("lparen") ? {type: "lparen"} : lparen), "_", (myLexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => {
            return {
                type: "fun_call",
                fun_name: data[0],
                arguments: []
            }
        }
                },
    {"name": "arg_list", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "arg_list", "symbols": ["arg_list", "__", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[2]];
        }
                },
    {"name": "expr", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (myLexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(myLexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (myLexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
