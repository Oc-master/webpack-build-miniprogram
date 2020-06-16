const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const replaceExt = require('replace-ext');
const { difference } = require('lodash');
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin');

class EntryExtractPlugin {
  constructor() {
    this.appContext = null;
    this.pages = [];
    this.entries = [];
  }

  /**
   * 将app.json中的pages字段与subpackages中的pages字段组合为数组返回
   * @return {Array} pages 页面路径数组
   */
  getPages() {
    const app = path.resolve(this.appContext, 'app.json');
    // FIXME: 未做 app.json 文件读取失败处理
    const content = fs.readFileSync(app, 'utf8');
    const { pages = [], subpackages = [], usingComponents = {} } = JSON.parse(content);
    const { length: pagesLength } = pages;
    if (!pagesLength) {
      console.log(chalk.red('ERROR in "app.json": pages字段缺失'));
      process.exit();
    }
    /** 收集分包中的页面 */
    const { length: subPackagesLength } = subpackages;
    if (subPackagesLength) {
      subpackages.forEach((subPackage) => {
        const { root, pages: subPages = [] } = subPackage;
        if (!root) {
          console.log(chalk.red('ERROR in "app.json": 分包配置中root字段缺失'));
          process.exit();
        }
        const { length: subPagesLength } = subPages;
        if (!subPagesLength) {
          console.log(chalk.red(`ERROR in "app.json": 当前分包 "${root}" 中pages字段为空`));
          process.exit();
        }
        subPages.forEach((subPage) => pages.push(`${root}/${subPage}`));
      });
    }
    /** 收集全局组件 */
    const componentList = Object.values(usingComponents);
    const { length: componentLength } = componentList;
    componentLength && componentList.forEach((component) => pages.push(component));
    return pages;
  }

  /**
   *	以页面为起始点递归寻找所使用的组件
   *	@param context {String} 当前文件的上下文路径
   *	@param dependPath {String} 依赖路径
   *  @param entries {Array} 包含全部入口的数组
   */
  addDependencies(context, dependPath, entries) {
    /** 生成绝对路径 */
    const isAbsolute = dependPath[0] === '/';
    let absolutePath = '';
    if (isAbsolute) {
      absolutePath = path.resolve(this.appContext, dependPath.slice(1));
    } else {
      absolutePath = path.resolve(context, dependPath);
    }
    /** 生成以源代码目录为基准的相对路径 */
    const relativePath = path.relative(this.appContext, absolutePath);
    /** 校验该路径是否合法以及是否在已有入口当中 */
    const jsPath = replaceExt(absolutePath, '.js');
    const isQualification = fs.existsSync(jsPath);
    if (!isQualification) {
      console.log(chalk.red(`ERROR in "${replaceExt(relativePath, '.js')}": 当前文件缺失`));
      process.exit();
    }
    const isExistence = entries.includes((entry) => entry === absolutePath);
    if (!isExistence) {
      entries.push(relativePath);
    }
    /** 获取json文件内容 */
    const jsonPath = replaceExt(absolutePath, '.json');
    const isJsonExistence = fs.existsSync(jsonPath);
    if (!isJsonExistence) {
      console.log(chalk.red(`ERROR in "${replaceExt(relativePath, '.json')}": 当前文件缺失`));
      process.exit();
    }
    try {
      const content = fs.readFileSync(jsonPath, 'utf8');
      const { usingComponents = {} } = JSON.parse(content);
      const components = Object.values(usingComponents);
      const { length } = components;
      /** 当json文件中有再引用其他组件时执行递归 */
      if (length) {
        const absoluteDir = path.dirname(absolutePath);
        components.forEach((component) => {
          this.addDependencies(absoluteDir, component, entries);
        });
      }
    } catch (e) {
      console.log(chalk.red(`ERROR in "${replaceExt(relativePath, '.json')}": 当前文件内容为空或书写不正确`));
      // process.exit();
    }
  }

  /**
   * 应用webpack入口
   * @param {String} context 源代码上下文路径
   * @param {String} entryName 入口名称
   * @param {String} module 入口相对于源代码上下文的相对路径
   */
  applyEntry(context, entryName, module) {
    if (Array.isArray(module)) {
      return new MultiEntryPlugin(context, module, entryName);
    }
    return new SingleEntryPlugin(context, module, entryName);
  }

  apply(compiler) {
    /** 设置源代码的上下文 */
    const { context } = compiler.options;
    this.appContext = context;

    compiler.hooks.entryOption.tap('EntryExtractPlugin', () => {
      /** 生成入口依赖数组 */
      this.pages = this.getPages();
      this.pages.forEach((page) => void this.addDependencies(context, page, this.entries));
      this.entries.forEach((entry) => {
        this.applyEntry(context, entry, `./${entry}`).apply(compiler);
      });
    });

    compiler.hooks.watchRun.tap('EntryExtractPlugin', () => {
      /** 校验页面入口是否增加 */
      const pages = this.getPages();
      const diffPages = difference(pages, this.pages);
      const { length } = diffPages;
      if (length) {
        this.pages = this.pages.concat(diffPages);
        const entries = [];
        /** 通过新增的入口页面建立依赖 */
        diffPages.forEach((page) => void this.addDependencies(context, page, entries));
        /** 去除与原有依赖的交集 */
        const diffEntries = difference(entries, this.entries);
        diffEntries.forEach((entry) => {
          this.applyEntry(context, entry, `./${entry}`).apply(compiler);
        });
        this.entries = this.entries.concat(diffEntries);
      }
    });

    compiler.hooks.done.tap('EntryExtractPlugin', () => console.log(chalk.green('Compiled successfully!')));
  }
}

module.exports = EntryExtractPlugin;
