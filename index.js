#!/usr/bin/env node

const lexer = require('./lib/lexer');
const parser = require('./lib/parser');
const generator = require('./lib/generator');

const fs = require('fs');
const { parse } = require('path');
const argv = require("yargs/yargs")(process.argv.slice(2))
  .option("file", {
    alias: "f",
    describe: "Save the HTML to disk",
  })
  .demandOption(["file"], "Please specify the file")
  .help().argv;

(async () => {
    const data = ((await fs.readFileSync(argv.file, "utf8")).toString());
    const ast = parser(data);

    generator(ast);
})();