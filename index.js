#!/usr/bin/env node
const webpack = require('webpack');
const shell = require('shelljs');
const chalk = require('chalk');

const config = require('./webpack.config');
const { DESTINATION } = require('./libs/dicts');

shell.rm('-rf', DESTINATION);

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
