const { yamlConfig } = require('../libs');

exports.loadCSS = ({ reg = /\.css$/, include, exclude, use = [] }) => ({
  module: {
    rules: [{
      include,
      exclude,
      test: reg,
      use: [{
        loader: require('mini-css-extract-plugin').loader,
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: [require('postcss-pxtorpx')({ propList: ['*'], multiplier: yamlConfig.css_unit_ratio })],
        },
      }].concat(use),
    }],
  },
});
