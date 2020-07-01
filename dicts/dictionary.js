module.exports = {
  PROJECT_PATH: process.cwd(),
  OPERATING_ENV: process.argv.slice(2)[0],
  PLATFORM_DICT: {
    template: {
      wx: 'wxss',
      swan: 'css',
    },
    style: {
      wx: 'wxml',
      swan: 'swan',
    }
  },
};
