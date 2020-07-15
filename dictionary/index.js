const path = require('path');

const PROJECT_PATH = process.cwd();
const [OPERATING_ENV] = process.argv.slice(2);
const SOURCE = path.resolve(PROJECT_PATH, 'src');
const DESTINATION = path.resolve(PROJECT_PATH, 'dist');

module.exports = {
  PROJECT_PATH,
  OPERATING_ENV,
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
};
