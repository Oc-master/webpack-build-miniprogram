const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const webpack = require('webpack');
const pxtorpx = require('postcss-pxtorpx');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const EntryExtractPlugin = require('./plugins/entry_extract_plugin');
const VantExtractPlugin = require('./plugins/vant_extract_plugin');

const { applyRoutes } = require('./utils');
const { PROJECT_PATH, OPERATING_ENV, PLATFORM_DICT } = require('./dicts/dictionary');

const YML = path.resolve(PROJECT_PATH, 'config.yaml');
const config = yaml.load(fs.readFileSync(YML, { encoding: 'utf-8' }));

module.exports = {
  mode: OPERATING_ENV === 'production' ? 'production' : 'development',
  devtool: OPERATING_ENV === 'production' ? '' : 'inline-source-map',
  context: path.resolve(PROJECT_PATH, 'src'),
  entry: {
    app: './app.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(PROJECT_PATH, 'dist'),
    globalObject: 'global',
  },
  resolve: {
    alias: {
      '@': path.resolve(PROJECT_PATH, 'src'),
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
          // presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-modules-commonjs'], // '@babel/plugin-transform-runtime'
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
    ],
  },
  plugins: [
    new EntryExtractPlugin({
      context: path.resolve(PROJECT_PATH, 'src'),
      templateExt: `.${PLATFORM_DICT.template[config.platform]}`,
    }),
    config.vant && new VantExtractPlugin({
      context: path.resolve(PROJECT_PATH, 'src'),
      vantContext: path.resolve(PROJECT_PATH, 'node_modules'),
    }),
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
        from: '**/*.axml',
        toType: 'dir',
      },
      {
        from: '**/*.acss',
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
        $hosts: config[`${OPERATING_ENV}_host`],
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
  watch: OPERATING_ENV === 'production' ? false : true,
  watchOptions: {
    aggregateTimeout: 800,
    ignored: /node_modules/,
  },
};
