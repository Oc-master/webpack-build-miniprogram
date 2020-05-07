const path = require('path');
const webpack = require('webpack');

const EntryExtractPlugin = require('./entry_extract_plugin');

const PROJECT_PATH = process.cwd();
const [OPERATING_ENV] = process.argv.slice(2);

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
    ],
  },
  plugins: [
    new EntryExtractPlugin(),
    new webpack.BannerPlugin({
      raw: true,
      include: 'app.js',
      banner: 'import commons from "./commons";\nimport manifest from "./manifest";'
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
