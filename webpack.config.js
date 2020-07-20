const webpack = require('webpack');
const pxtorpx = require('postcss-pxtorpx');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const EntryExtractPlugin = require('entry-extract-webpack-plugin');
const UiExtractPlugin = require('ui-extract-webpack-plugin');
const { applyRoutes, isProduction, getConfig } = require('./utils');
const { OPERATING_ENV, PLATFORM_DICT, SOURCE, DESTINATION } = require('./dictionary');

const config = getConfig();

module.exports = {
  mode: isProduction() ? 'production' : 'development',
  devtool: isProduction() ? '' : 'inline-source-map',
  context: SOURCE,
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
                  multiplier: config.css_unit_ratio,
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
      {
        test: /\.styl&/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                pxtorpx({
                  multiplier: config.css_unit_ratio,
                  propList: ['*'],
                }),
              ],
            },
          },
          'stylus-loader',
        ],
      },
    ],
  },
  plugins: [
    new EntryExtractPlugin({ templateExt: `.${PLATFORM_DICT.template[config.platform]}` }),
    new UiExtractPlugin({ context: SOURCE }),
    new webpack.BannerPlugin({
      raw: true,
      include: 'app.js',
      banner: 'const commons = require("./commons");\nconst manifest = require("./manifest");',
    }),
    new MiniCssExtractPlugin({ filename: `[name].${PLATFORM_DICT.style[config.platform]}` }),
    new CopyPlugin([
      {
        from: 'assets/',
        to: 'assets/',
        toType: 'dir',
      },
      {
        from: '**/*.wxml',
        toType: 'dir',
      },
      {
        from: '**/*.wxss',
        toType: 'dir',
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
        from: '**/*.json',
        toType: 'dir',
      },
      {
        from: '**/*.wxs',
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
    new webpack.DefinePlugin({
      mc: JSON.stringify({
        $env: OPERATING_ENV,
        $hosts: config[`${OPERATING_ENV}_host`] || {},
        $routes: applyRoutes(),
      }),
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
