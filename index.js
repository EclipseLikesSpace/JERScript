#!/usr/bin/env node

// Imports
const chalk = import('chalk')

// ./lib
const lexer = require('./lib/lexer');
const parser = require('./lib/parser');
const generator = require('./lib/generator');

// Yargonaut styling
require('yargonaut')
  .style('blue')
  .errorsStyle('red');

const yargs = require("yargs");

const fs = require('fs');
const { parse } = require('path');
const { arg } = require('mathjs');
let argv = yargs(process.argv.slice(2))
  .option("file", {
    alias: "f",
    describe: "JER file to interpret",
  })
  .option("output", {
    alias: "o",
    describe: "Where to output JERC file",
  })
  .demandOption(["file"], "Please specify the file")
  .help().argv;

(async () => {
  const data = ((await fs.readFileSync(argv.file, "utf8")).toString());
  console.log(data)
  const ast = parser(data);
  console.log(ast)
  
  generator(ast, false, null);
  //generator(ast, isCompiled, argv.output);
})();