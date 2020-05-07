#!/usr/bin/env node
const path = require('path');
const webpack = require('webpack');
const shell = require('shelljs');
const chalk = require('chalk');

const config = require('./webpack.config');

const PROJECT_PATH = process.cwd();
const [OPERATING_ENV] = process.argv.slice(2);

OPERATING_ENV === 'production' && shell.rm('-rf', path.resolve(PROJECT_PATH, 'dist'));

webpack(config, () => {
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
