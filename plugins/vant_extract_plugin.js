class VantExtractPlugin {
  apply(compiler) {
    compiler.hooks.watchRun.tap('VantExtractPlugin', (params) => {
      console.log(params);
    });
  }
}

module.exports = VantExtractPlugin;
