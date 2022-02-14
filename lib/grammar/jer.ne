@{%
const myLexer = require("./../lexer")
%}
@lexer myLexer

statement
    -> var_assign {% id %}
    | fun_call {% id %}

var_assign
    -> %identifier _ %assign _ expr
        {%
            (data) => {
                return {
                    type: "var_assign",
                    var_name: data[0],
                    var_value: data[4]
                }
            }
        %}

fun_call
    -> %identifier _ %lparen _ arg_list _ %rparen
        {%
            (data) => {
                return {
                    type: "fun_call",
                    fun_name: data[0],
                    arguments: data[4]
                }
            }
        %}

arg_list
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    | arg_list __ expr
        {%
            (data) => {
                return [...data[0], data[2]];
            }
        %}


expr
    -> %string {% id %}
    | %number {% id %}

# Optional whitespace
_ -> %WS:*

# Mandatory whitespace
__ -> %WS:+