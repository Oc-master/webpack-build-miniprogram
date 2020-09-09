#!/usr/bin/env node
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const shell = require('shelljs');
const chalk = require('chalk');

const { NODE_ENV, DESTINATION, WEBPACK_CONFIG } = require('./libs/dicts');
const commonConfig = require('./config/webpack.common');
const extensionConfig = require(WEBPACK_CONFIG);

shell.rm('-rf', DESTINATION);

const config = (function(mode) {
  if (mode === 'production') {
    return merge([
      commonConfig,
      { mode },
      extensionConfig,
    ]);
  } else {
    return merge([
      commonConfig,
      {
        mode: 'development',
        watch: true,
        watchOptions: { ignored: /node_modules/ },
      },
      extensionConfig,
    ]);
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
