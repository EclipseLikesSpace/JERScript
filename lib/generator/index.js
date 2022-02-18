const fs = require('fs');
const { mod } = require('mathjs');
const runtime = require("./../runtime");

const atb64 = (text) => {
    return Buffer.from(text, 'ascii').toString('base64');
};

const b64ta = (base64) => {
    return Buffer.from(base64, 'base64').toString('ascii');
};

const stackOfTasks = [];

async function main(ast, isCompile, output) {
    if (!ast) { throw new Error("Please specify the file"); }
    
    // We expect the AST to already be an object/array, we run generate to generate the JS code
    let jsCode = null;
    if (isCompile) {
        jsCode = generate(ast)
        //const b64 = Buffer.from(jsCode).toString("base64");
        //await fs.writeFileSync(output, b64);
        await fs.writeFileSync(output, atb64(jsCode));
    } else {
        jsCode = `${runtime}\n\n\n\n\n\n\n\n\n\n\n` + generate(ast);
        eval(jsCode);
    }
    await fs.writeFileSync("log/out.log", jsCode)
    return 0;
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
        const state = generateStatement(node.var_value)
        const js = `${node.var_name.value} = ${state};`;
        return js
    }else if (node.type === "fun_call" ) {
        let funName = node.fun_name.value;
        if (funName === "if") {
            funName = "$if";
        }else if(funName === "while") {
            funName = "$while";
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
    
    }else if (node.type === "arrays"){
        const arrayified = node.arguments.map(arg => arg).join(", ");
        if (node.arguments.length > 0) return "[" + arrayified + "]";
        return "[]";
    }else if(node.type === "use") {
        const dir = node.module.value.replace(/["]+/g, '');
        const file = fs.readFileSync(dir, "utf8");
        //const module = Buffer.from(file, 'base64').toString('ascii');
        //console.log("Module: " + module)
        eval(runtime + b64ta(file));
        return node.module;
    }else if (node.type === "comment"){
        return "";
    }else {
        throw new Error("Unknown statement type: " + node.type);
    }
}

module.exports = function(ast, isCompile, output) {
    main(ast, isCompile, output).catch(err => console.log(err.stack));
}