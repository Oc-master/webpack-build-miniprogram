const webpack = require('webpack');
const { merge } = require('webpack-merge');
const chalk = require('chalk');
const dayjs = require('dayjs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const EntryExtractPlugin = require('entry-extract-webpack-plugin');
const UiExtractPlugin = require('ui-extract-webpack-plugin');

const parts = require('./webpack.part');
const { yamlConfig, routes, isProduction } = require('../libs');
const { NODE_ENV, SOURCE, DESTINATION, PLATFORM_CONFIG } = require('../libs/dicts');

const config = {
  mode: isProduction() ? 'production' : 'development',
  context: SOURCE,
  devtool: 'none',
  entry: {
    app: './app.js',
  },
  output: {
    filename: '[name].js',
    path: DESTINATION,
    globalObject: 'global',
  },
  resolve: {
    alias: {
      '@': SOURCE,
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          cache: false,
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            '@babel/plugin-transform-modules-commonjs',
            ['@babel/plugin-proposal-class-properties', { 'loose': true }],
          ],
        },
      },
    ],
  },
  plugins: [
    new EntryExtractPlugin({ templateExt: `${PLATFORM_CONFIG[yamlConfig.platform].template}` }),
    new UiExtractPlugin({ context: SOURCE }),
    new webpack.BannerPlugin({
      raw: true,
      include: 'app.js',
      banner: 'const commons = require("./commons");\nconst manifest = require("./manifest");',
    }),
    new webpack.DefinePlugin({
      mc: JSON.stringify({
        $env: NODE_ENV,
        $hosts: yamlConfig[`${NODE_ENV}_host`] || {},
        $routes: routes,
      }),
    }),
    new webpack.ProvidePlugin({
      'mc.routerTo': ['medusa-wx-router', 'routerTo'],
      'mc.decoding': ['medusa-wx-router', 'decoding'],
      'mc.back': ['medusa-wx-router', 'back'],
      'mc.goHome': ['medusa-wx-router', 'goHome'],
    }),
    new MiniCssExtractPlugin({ filename: `[name]${PLATFORM_CONFIG[yamlConfig.platform].style}` }),
    new CopyPlugin([
      {
        from: 'assets/',
        to: 'assets/',
        toType: 'dir',
      },
      {
        from: '**/*.json',
        toType: 'dir',
        globOptions: {
          ignore: ['**/vant/**'],
        },
      },
      {
        from: '**/*.wxml',
        toType: 'dir',
        globOptions: {
          ignore: ['**/vant/**'],
        },
      },
      {
        from: '**/*.wxss',
        toType: 'dir',
        globOptions: {
          ignore: ['**/vant/**'],
        },
      },
      {
        from: '**/*.wxs',
        toType: 'dir',
        globOptions: {
          ignore: ['**/vant/**'],
        },
      },
      {
        from: '**/*.swan',
        toType: 'dir',
      },
      {
        from: '**/*.css',
        toType: 'dir',
      },
      {
        from: '**/*.sjs',
        toType: 'dir',
      },
    ]),
    new StylelintPlugin({
      fix: true,
      files: '**/*.(sa|sc|le|wx|c)ss',
    }),
    new ProgressBarPlugin({
      summary: false,
      format: ':msg :percent (:elapsed seconds)',
      customSummary: (buildTime) => console.log(chalk.gray(`\n[${dayjs().format('HH:mm:ss')}]`), chalk.green(`Compiled successfully!(${buildTime})\n`)),
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          name: 'commons',
          minSize: 0,
          maxSize: 0,
          minChunks: 3,
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  watch: isProduction() ? false : true,
  watchOptions: {
    aggregateTimeout: 800,
    ignored: /node_modules/,
  },
};

module.exports = merge([
  config,
  parts.loadCSS({
    reg: /\.less$/,
    use: ['less-loader'],
  }),
]);
