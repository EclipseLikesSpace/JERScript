@{%
const myLexer = require("./../lexer")
%}
@lexer myLexer

statement
    -> var_assign {% id %}

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

expr
    -> %string {% id %}
    | %number {% id %}

# Optional whitespace
_ -> %WS:*

# Mandatory whitespace
__ -> %WS:+