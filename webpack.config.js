const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const EntryExtractPlugin = require('./entry_extract_plugin');

const PLATFORM_DICT = {
  wx: 'wxss',
  my: 'acss',
  swan: 'css',
};
const PROJECT_PATH = process.cwd();
const { OPERATING_ENV } = process.env;
const [platformStr] = process.argv.slice(2);
const [_, platform] = platformStr.split('.');

module.exports = {
  mode: OPERATING_ENV,
  devtool: OPERATING_ENV === 'production' ? 'source-map' : 'inline-source-map',
  context: path.resolve(PROJECT_PATH, 'src'),
  entry: {
    app: './app.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(PROJECT_PATH, 'dist'),
    globalObject: 'global',
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
          cache: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
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
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new EntryExtractPlugin(),
    new webpack.BannerPlugin({
      raw: true,
      include: 'app.js',
      banner: 'import commons from "./commons";\nimport manifest from "./manifest";'
    }),
    new MiniCssExtractPlugin({ filename: `[name].${PLATFORM_DICT[platform]}` }),
    new CopyPlugin([
      {
        from: 'assets/',
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
    ]),
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
