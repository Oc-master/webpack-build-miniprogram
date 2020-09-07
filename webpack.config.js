const webpack = require('webpack');
const chalk = require('chalk');
const dayjs = require('dayjs');
const pxtorpx = require('postcss-pxtorpx');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const EntryExtractPlugin = require('entry-extract-webpack-plugin');
const UiExtractPlugin = require('ui-extract-webpack-plugin');

const { isProduction } = require('./utils');
const { yamlConfig, routes } = require('./libs');
const { NODE_ENV, SOURCE, DESTINATION, PLATFORM_CONFIG } = require('./libs/dicts');

module.exports = {
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
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                pxtorpx({
                  multiplier: yamlConfig.css_unit_ratio,
                  propList: ['*'],
                }),
              ],
            },
          },
          {
            loader: 'less-loader',
          },
        ],
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
    new MiniCssExtractPlugin({ filename: `[name]${PLATFORM_DICT[yamlConfig.platform].style}` }),
    new CopyPlugin([
      {
        from: 'assets/',
        to: 'assets/',
        toType: 'dir',
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
        from: '**/*.json',
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
      files: '**/*.(le|wx|c)ss',
      fix: true,
    }),
    new ProgressBarPlugin({
      summary: false,
      customSummary: function(buildTime) {
        console.log(chalk.gray(`\n[${dayjs().format('HH:mm:ss')}]`), chalk.green(`Compiled successfully!(${buildTime})\n`));
      },
      format: ':msg :percent (:elapsed seconds)'
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
