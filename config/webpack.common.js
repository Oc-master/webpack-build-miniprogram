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
const Dotenv = require('dotenv-webpack');
const CommonBannerPlugin = require('../plugins/common_banner_plugin');

const parts = require('./webpack.part');
const { yamlConfig, routes, packages } = require('../libs');
const { NODE_ENV, SOURCE, DESTINATION, PLATFORM_CONFIG, ENV_CONFIG } = require('../libs/dicts');

const config = {
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
    extensions: ['.js', '.ts', '.json'],
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
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new EntryExtractPlugin({ templateExt: `${PLATFORM_CONFIG[yamlConfig.platform].template}` }),
    new UiExtractPlugin({ context: SOURCE }),
    new CommonBannerPlugin({ include: packages }),
    new webpack.BannerPlugin({
      raw: true,
      include: 'app.js',
      banner: 'const vendors = require("./vendors");\nconst commons = require("./commons");\nconst manifest = require("./manifest");',
    }),
    new webpack.DefinePlugin({
      MS_ENV: JSON.stringify(NODE_ENV),
      MS_HOSTS: JSON.stringify(yamlConfig[`${NODE_ENV}_host`] || {}),
      MS_ROUTES: JSON.stringify(routes),
    }),
    new webpack.ProvidePlugin({
      Toast: 'medusa-wx-toast',
      'ms.routerTo': ['medusa-wx-router', 'routerTo'],
      'ms.decoding': ['medusa-wx-router', 'decoding'],
      'ms.back': ['medusa-wx-router', 'back'],
      'ms.goHome': ['medusa-wx-router', 'goHome'],
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
    new Dotenv({ path: ENV_CONFIG, silent: true }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 3,
          priority: 20,
        },
        commons: {
          chunks: 'initial',
          name: 'commons',
          test: /[\\/](utils|libs|services|api|models|actions|layouts)[\\/]/,
          minSize: 0,
          maxSize: 0,
          minChunks: 3,
          priority: 10,
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
};

module.exports = merge([
  config,
  parts.loadCSS({
    reg: /\.less$/,
    use: ['less-loader'],
  }),
  parts.loadCommons(packages),
]);
