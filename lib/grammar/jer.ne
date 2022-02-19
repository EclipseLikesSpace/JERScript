@{%
const myLexer = require("./../lexer")
%}
@lexer myLexer

statements
    -> _ statement _
        {%
            (data) => {
                return [data[1]];
            }
        %}
    | statements %newline _ statement _
        {%
            (data) => {
                return [...data[0], data[3]];
            }
        %}

statement
    -> var_assign {% id %}
    | fun_call {% id %}
    | use {% id %}
    | %comment {% id %}

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
    -> %identifier _ %lparen _ml (arg_list _ml):? %rparen
        {%
            (data) => {
                return {
                    type: "fun_call",
                    fun_name: data[0],
                    arguments: data[4] ? data[4][0]: []
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
    | %identifier {% id %}
    | %boolean {% id %}
    | fun_call {% id %}
    | array {% id %}
    | lambda {% id %}

array
    -> %lbracket _ml (arg_list _ml):? %rbracket
        {%
            (data) => {
                return {
                    type: "arrays",
                    arguments: data[2] ? data[2][0]: []
                }
            }
        %}

use -> "use" _ ":" _ %string _
    {%
        (data) => {
            return {
                "type": "use",
                "module": data[4]
            }
        }
    %}

lambda -> %lparen _ (param_list):? _ %rparen _ %longarrow _ lambda_body
    {%
        (data) => {
            return {
                type: "lambda",
                parameters: data[2] ? data[2][0] : [],
                body: data[8]
            }
        }
    %}
    
param_list
    -> %identifier (__ %identifier):*
        {%
            (data) => {
                const rpieces = data[1];
                const params = rpieces.map(piece => piece[1]);
                return [data[0], ...params];
            }
        %}

lambda_body
    -> expr 
        {%
            (data) => {
                return [data[0]];
            }
        %}
    | %lbrace _ %newline statements %newline _ %rbrace
        {%
            (data) => {
                return data[3]
            }
        %}

# Multiline Optional Whitespace
_ml -> (%ws | %newline):*

# Multiline mandatory whitespace
__ml -> (%ws | %newline):+

# Optional whitespace
_ -> %ws:*

# Mandatory whitespace
__ -> %ws:+
