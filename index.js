#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const shell = require('shelljs');
const chalk = require('chalk');
const yaml = require('js-yaml');

const config = require('./webpack.config');
const { PROJECT_PATH, OPERATING_ENV } = require('./dictionary');

// const PROJECT_PATH = process.cwd();
// const { OPERATING_ENV } = process.env;
const YML = path.resolve(PROJECT_PATH, 'config.yaml');
const obj = yaml.load(fs.readFileSync(YML, { encoding: 'utf-8' }));
console.log(chalk.blue(obj), process.argv);

OPERATING_ENV === 'production' && shell.rm('-rf', path.resolve(PROJECT_PATH, 'dist'));

webpack(config, (err, stats) => {
  if (err) {
    console.log(chalk.red(err.stack || err));
    if (err.details) {
      console.log(chalk.red(err.details));
    }
    return undefined;
  }
  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.log(chalk.red(info.errors));
  }
  if (stats.hasWarnings()) {
    console.log(chalk.yellow(info.warnings));
  }
});
