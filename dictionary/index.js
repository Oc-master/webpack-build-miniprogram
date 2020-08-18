const path = require('path');

const [OPERATING_ENV] = process.argv.slice(2);
const PROJECT_PATH = process.cwd();
const SOURCE = path.resolve(PROJECT_PATH, 'src');
const DESTINATION = path.resolve(PROJECT_PATH, 'dist');

module.exports = {
  OPERATING_ENV,
  PROJECT_PATH,
  SOURCE,
  DESTINATION,
  PLATFORM_DICT: {
    template: {
      wx: 'wxml',
      swan: 'swan',
    },
    style: {
      wx: 'wxss',
      swan: 'css',
    },
  },
  DEFAULT_CONFIG: {
    platform: 'wx',
    css_unit_ratio: 1,
  },
};
