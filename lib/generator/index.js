const fs = require('fs');;

async function main(ast) {
    if (!ast) { throw new Error("Please specify the file"); }
    // We expect the AST to already be an object/array
    const jsCode = generate(ast);
    console.log(jsCode)
    //await fs.writeFileSync("out.js", jsCode)
    eval(jsCode)
}

function generate(statements) {
    const lines = [];
    for (const statement of statements[0]) {
        lines.push(generateStatement(statement));
    }

    for (var i = 0; i > statements.length; i++) {
        const line = generate_statement(statements[i]);
        lines.push(line);
    }
    return lines.join("\n")
}

function generateStatement(node) {
    if (node.type == "var_assign") {
        const js = `let ${node.var_name.value} = ${node.var_value.value};`;
        return js
    }
}

module.exports = function(ast) {
    main(ast).catch(err => console.log(err.stack));
}