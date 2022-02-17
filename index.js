#!/usr/bin/env node

// Imports
import chalk from 'chalk';

// ./lib
import lexer from './lib/lexer/index.js';
import parser from './lib/parser/index.js';
import generator from './lib/generator/index.js';

// Yargonaut styling
import yargonaut from 'yargonaut';
yargonaut
  .style('blue')
  .errorsStyle('red');

import yargs from 'yargs';

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
  console.log(chalk.blue("Reading file..."));
  const data = ((await fs.readFileSync(argv.file, "utf8")).toString());
  console.log(("Parsing file..."));
  const ast = parser(data);
  console.log(chalk.blue("Running..."));
  generator(ast);
})();