const path = require('path');
const slash = require('slash');
const ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');
const { ConcatSource } = require("webpack-sources");

class CommonBannerPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { context } = compiler;
    this.context = context;
    const matchObject = ModuleFilenameHelpers.matchObject.bind(undefined, this.options);

    compiler.hooks.compilation.tap('CommonBannerPlugin', (compilation) => {
      compilation.hooks.optimizeChunkAssets.tap('CommonBannerPlugin', (chunks) => {
        for (const chunk of chunks) {
          if (!chunk.canBeInitial()) {
            continue;
          }
          for (const file of chunk.files) {
            if (!matchObject(file)) {
              continue;
            }
            const isJsFile = file.includes('.js');
            if (!isJsFile) {
              continue;
            }
            const isCommonsFile = file.includes('packageCommons.js');
            if (isCommonsFile) {
              continue;
            }
            const resourcePath = path.resolve(this.context, file);
            const { include } = this.options;
            const packageName = include.find((item) => resourcePath.includes(item));
            const commonsPath = path.resolve(this.context, packageName, 'packageCommons.js');
            const relativePath = path.relative(path.dirname(resourcePath), commonsPath);
            /** slash工具输出兼容 windows 操作系统的路径 引入相对路径 */
            const comment = `require("${slash(relativePath)}");`;
            compilation.updateAsset(file, old => new ConcatSource(comment, "\n", old));
          }
        }
      });

      compiler.hooks.emit.tapAsync('EntryExtractPlugin', (compilation, callback) => {
        const { include } = this.options;
        include.forEach((item) => {
          if (!compilation.assets[`${item}/packageCommons.js`]) {
            compilation.assets[`${item}/packageCommons.js`] = { source: () => '', size: () => 0 };
          }
        });
        callback();
      });
    });
  }
}

module.exports = CommonBannerPlugin;
