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

exports.loadCommons = (packages) => {
  const { length } = packages;
  if (!length) return {};
  const cacheGroups = packages.reduce((acc, item) => {
    return {
      ...acc,
      [`${item}Commons`]: {
        chunks: 'initial',
        name: `${item}/packageCommons`,
        test: new RegExp(`[\\/]${item}[\\/]`),
        minSize: 0,
        maxSize: 0,
        minChunks: 3,
        priority: 15,
      },
    };
  }, {});
  return {
    optimization: {
      splitChunks: { cacheGroups },
    },
  };
};
