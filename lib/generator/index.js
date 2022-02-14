const fs = require('fs');;

async function main(ast) {
    if (!ast) { throw new Error("Please specify the file"); }
    // We expect the AST to already be an object/array
    const jsCode = generate(ast);
    console.log("Finished transpiling")
    console.log(`Output: "${jsCode}"`)
    //await fs.writeFileSync("out.js", jsCode)
    console.log("Wrote to out.js");
}

function generate(statements) {
    const lines = [];
    /* for (let statement of ast) {
        console.log(statement)
        const line = generate_statement(statement);
        lines.push(line);
        console.log("Line: " + line)
    } */
    console.log(JSON.stringify(statements[0], null, 2))

    for (var i = 0; i > statements.length; i++) {
        console.log(statements[i])
        const line = generate_statement(statements[i]);
        lines.push(line);
    }
    return lines.join("\n")
}

function generate_statement(node) {
    console.log("Generating statement")
    if (node.type == "var_assign") {
        const js = `${node.var_name.value} = ${node.value.value};`;
        return js
    } else {
        console.log("No valid statement type")
    }
}

module.exports = function(ast) {
    main(ast).catch(err => console.log(err.stack));
}