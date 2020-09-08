const path = require('path');

/** 环境变量 */
exports.NODE_ENV = process.argv.splice(2, 1);
/** 项目路径 */
exports.ROOT = process.cwd();
/** 源代码存放路径 */
exports.SOURCE = path.resolve(this.ROOT, 'src');
/** 目标代码存放路径 */
exports.DESTINATION = path.resolve(this.ROOT, 'dist');
/** 配置文件路径 */
exports.CONFIG = path.resolve(this.ROOT, 'config.yaml');
/** app.json 配置文件路径 */
exports.APP_CONFIG = path.resolve(this.SOURCE, 'app.json');
/** .env 配置文件路径 */
exports.ENV_CONFIG = path.resolve(this.ROOT, '.env');
/** 默认配置文件 */
exports.DEFAULT_CONFIG = {
  platform: 'wx',
  css_unit_ratio: 1,
};
/** 平台映射字典 */
exports.PLATFORM_CONFIG = {
  wx: {
    template: '.wxml',
    style: '.wxss',
  },
  swan: {
    template: '.swan',
    style: '.css',
  },
};
