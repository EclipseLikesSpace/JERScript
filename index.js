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
let argv = yargs(process.argv.slice(2))
  .option("file", {
    alias: "f",
    describe: "Save the HTML to disk",
  })
  .demandOption(["file"], "Please specify the file")
  .help().argv;

(async () => {
  console.log("Reading file...");
  const data = ((await fs.readFileSync(argv.file, "utf8")).toString());
  console.log("Parsing file...");
  const ast = parser(data);
  console.log("Running...");
  generator(ast);
})();