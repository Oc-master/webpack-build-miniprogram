module.exports = {
  PROJECT_PATH: process.cwd(),
  OPERATING_ENV: process.argv.slice(2)[0],
  PLATFORM_DICT: {
    wx: 'wxss',
    swan: 'css',
  },
};