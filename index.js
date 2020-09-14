#!/usr/bin/env node
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const shell = require('shelljs');
const chalk = require('chalk');

const { NODE_ENV, DESTINATION, WEBPACK_CONFIG } = require('./libs/dicts');
const commonConfig = require('./config/webpack.common');
/** 引入 webpack 扩展配置文件 */
const extensionConfig = require(WEBPACK_CONFIG);

/** 重新启动命令时 删除已有的编译结果目录 */
shell.rm('-rf', DESTINATION);
/** IIFE 获取 webpack 配置 */
const config = (function(mode) {
  if (mode === 'production') {
    return merge([commonConfig, { mode }, extensionConfig]);
  } else {
    return merge([commonConfig, {
      mode: 'development',
      watch: true,
      watchOptions: { ignored: /node_modules/ },
    }, extensionConfig]);
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
