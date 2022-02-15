const fs = require('fs');
const runtime = require("./../runtime");

async function main(ast) {
    if (!ast) { throw new Error("Please specify the file"); }
    // We expect the AST to already be an object/array, we run generate to generate the JS code
    const jsCode = generate(ast) + `\n${runtime}`;
    console.log(jsCode)
    //await fs.writeFileSync("out.js", jsCode)
    eval(jsCode)
}

function generate(statements) {
    // Array for storing the statements
    const lines = [];

    // For loop to iterate through the statements
    for (const statement of statements[0]) {
        // Generate the JS code for the statement, then push to lines[]
        lines.push(generateStatement(statement));
    }
    
    // Returns all lines, with a \n between each line
    return lines.join("\n")
}

function generateStatement(node) {
    // Switch statement to determine which type of statement we are dealing with
    if (node.type === "var_assign") {
        const js = `${node.var_name.value} = ${generateStatement(node.var_value)};`;
        return js
    }else if (node.type === "fun_call" ) {
        let funName = node.fun_name.value;
        if (funName === "if") {
            funName = "$if";
        }
        const argList = node.arguments.map (arg => {
            return generateStatement(arg);
        }).join(", ");
        return `${funName}(${argList})`
    } else if (node.type === "string") {
        return node.value;
    } else if (node.type === "number") {
        return node.value;
    } else if (node.type === "identifier") {
        return node.value;
    } else if (node.type === "lambda") {
        const paramList = node.parameters
            .map(param => param.value)
            .join(", ");
        
        const jsBody = node.body.map((arg, i) => {
            const jsCode = generateStatement(arg)
            if (i === node.body.length - 1) {
                return "return " + jsCode
            } else {
                return jsCode
            }
        }).join(";\n")
        return `function (${paramList}){\n${jsBody}\n}`
    } else {
        throw new Error("Unknown statement type: " + node.type);
    }
}

module.exports = function(ast) {
    main(ast).catch(err => console.log(err.stack));
}