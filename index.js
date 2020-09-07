#!/usr/bin/env node
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const shell = require('shelljs');
const chalk = require('chalk');

const commonConfig = require('./config/webpack.common');
const { NODE_ENV, DESTINATION } = require('./libs/dicts');

shell.rm('-rf', DESTINATION);

const config = (function(mode) {
  if (mode === 'production') {
    return merge(commonConfig, { mode });
  } else {
    return merge(commonConfig, {
      mode: 'development',
      watch: true,
      watchOptions: { ignored: /node_modules/ },
    });
  }
})(NODE_ENV);

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
