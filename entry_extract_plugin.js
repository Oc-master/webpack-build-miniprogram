const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const chalk = require('chalk');
const { difference } = require('lodash');
const replaceExt = require('replace-ext');
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

class EntryExtractPlugin {
  constructor({ context, templateExt = '.wxml' }) {
    this.appContext = context;
    this.templateExt = templateExt;
    this.initialEntries = [];
    this.entries = [];
  }

  apply(compiler) {
    /** 第一次启动构建，生成初始构建入口 */
    compiler.hooks.entryOption.tap('EntryExtractPlugin', () => {
      this.applyFirstEntries();
      this.entries.forEach((entry) => this.applyEntry(entry, `./${entry}.js`).apply(compiler));
      const routes = this.applyRoutes();
      new DefinePlugin({ $routes: JSON.stringify(routes) }).apply(compiler);
    });

    compiler.hooks.watchRun.tap('EntryExtractPlugin', (params) => {
      const { mtimes } = params.watchFileSystem.watcher;
      const [module] = Object.keys(mtimes);
      if (!module) return undefined;
      const entries = this.rebuildEntries(module);
      entries && entries.forEach((entry) => this.applyEntry(entry, `./${entry}.js`).apply(compiler));
    });

    compiler.hooks.emit.tapAsync('EntryExtractPlugin', (compilation, callback) => {
      if (!compilation.assets['commons.js']) {
        compilation.assets['commons.js'] = { source: () => '', size: () => 0 };
      }
      callback();
    });

    compiler.hooks.done.tap('EntryExtractPlugin', () => {
      console.log();
      console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.green('INFO: Compiled successfully!'));
    });
  }

  /**
   * 添加构建入口
   * @param {String} entryName 入口名称
   * @param {String} module 入口相对于源代码上下文的相对路径
   */
  applyEntry(entryName, module) {
    if (Array.isArray(module)) {
      return new MultiEntryPlugin(this.appContext, module, entryName);
    }
    return new SingleEntryPlugin(this.appContext, module, entryName);
  }

  /**
   * 生成当前模块相对于源代码上下文的相对路径
   * @param {String} context 模块路径的上下文
   * @param {String} modulePath 模块路径
   */
  transformRelative(context, modulePath) {
    const isAbsolute = modulePath[0] === '/';
    const absolutePath = isAbsolute ? path.resolve(this.appContext, modulePath.slice(1)) : path.resolve(context, modulePath);
    const relativePath = path.relative(this.appContext, absolutePath);
    return relativePath;
  }

  /**
   * 检验当前模块是否符合成为入口
   * @param {String} modulePath 模块路径
   * @return {Boolean} isQualification 是否符合成为入口
   * @return {Boolean} isContinue 是否能够继续寻找依赖
   */
  checkModule(modulePath) {
    const absolutePath = path.resolve(this.appContext, modulePath);
    const isNpmModule = absolutePath.indexOf('miniprogram_npm') !== -1;
    if (isNpmModule) return { isQualification: false, isContinue: false };
    const jsPath = replaceExt(absolutePath, '.js');
    const isQualification = fs.existsSync(jsPath);
    !isQualification && console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.yellow(`WARNING: "${replaceExt(modulePath, '.js')}" 逻辑文件缺失`));
    const jsonPath = replaceExt(absolutePath, '.json');
    const isContinue = fs.existsSync(jsonPath);
    !isContinue && console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.yellow(`WARNING: "${replaceExt(modulePath, '.json')}" 配置文件缺失`));
    const templatePath = replaceExt(absolutePath, this.templateExt);
    const isExistence = fs.existsSync(templatePath);
    !isExistence && console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.yellow(`WARNING: "${replaceExt(modulePath, this.templateExt)}" 模版文件缺失`));
    return { isQualification, isContinue };
  }

  /**
   * 收集单一模块所依赖的其他模块，用来生成入口数组
   * @param {String} context 模块路径的上下文
   * @param {String} modulePath 模块路径
   * @param {Array}} entries 入口数组
   */
  addEntries(context, modulePath, entries) {
    const relativePath = this.transformRelative(context, modulePath);
    const { isQualification, isContinue } = this.checkModule(relativePath);
    isQualification && entries.push(relativePath);
    if (isContinue) {
      const jsonFile = replaceExt(relativePath, '.json');
      const jsonPath = path.resolve(this.appContext, jsonFile);
      try {
        const content = fs.readFileSync(jsonPath, 'utf8');
        const { usingComponents = {} } = JSON.parse(content);
        const components = Object.values(usingComponents);
        const { length } = components;
        if (length) {
          const moduleContext = path.dirname(jsonPath);
          components.forEach((component) => this.addEntries(moduleContext, component, entries));
        }
      } catch (e) {
        console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red(`ERROR: "${jsonFile}" 文件内容读取失败`));
      }
    }
  }

  /**
   * 获取初始的入口数组（未处理）
   * @return {Array} entries 从 app.json 中收集的初始入口数组
   */
  getInitialEntries() {
    try {
      const appPath = path.resolve(this.appContext, 'app.json');
      const content = fs.readFileSync(appPath, 'utf8');
      const { pages = [], usingComponents = {}, subpackages = [] } = JSON.parse(content);
      const { length: pagesLength } = pages;
      if (!pagesLength) {
        console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red('ERROR: "app.json" pages字段缺失'));
        process.exit();
      }
      const components = Object.values(usingComponents);
      const { length: componentsLength } = components;
      if (componentsLength) pages.push(...components);
      const { length: subpackagesLength } = subpackages;
      if (!subpackagesLength) return pages;
      subpackages.forEach((subPackage) => {
        const { root, pages: subPages = [] } = subPackage;
        if (!root) {
          console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red('ERROR: "app.json" 分包配置中root字段缺失'));
          return undefined;
        }
        const { length: subPagesLength } = subPages;
        if (!subPagesLength) {
          console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red(`ERROR: "app.json" 当前分包 "${root}" 中pages字段为空`));
          return undefined;
        }
        subPages.forEach((subPage) => pages.push(`${root}/${subPage}`));
      });
      return pages;
    } catch (e) {
      console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red('ERROR: "app.json" 文件内容读取失败'));
      process.exit();
    }
  }

  /**
   * 生成初次启动构建所需要的入口数组
   */
  applyFirstEntries() {
    this.initialEntries = this.getInitialEntries();
    this.entries = this.initialEntries.reduce((acc, entry) => {
      const entries = [];
      this.addEntries(this.appContext, entry, entries);
      return [...new Set([...acc, ...entries])];
    }, []);
  }

  /**
   * 运行过程中添加构建入口
   * @param {String} module 触发重新构建的模块路径
   */
  rebuildEntries(module) {
    const isJsonFile = module.indexOf('.json') !== -1;
    if (!isJsonFile) return undefined;
    const isAppJsonFile = module.indexOf('app.json') !== -1;
    if (isAppJsonFile) {
      const initialEntries = this.getInitialEntries();
      const diffInitialEntries = difference(initialEntries, this.initialEntries);
      const { length: diffInitialEntriesLength } = diffInitialEntries;
      if (!diffInitialEntriesLength) return undefined;
      this.initialEntries.push(...diffInitialEntries);
      const entries = diffInitialEntries.reduce((acc, entry) => {
        const itemEntries = [];
        this.addEntries(this.appContext, entry, itemEntries);
        return [...new Set([...acc, ...itemEntries])];
      }, []);
      const diffEntries = difference(entries, this.entries);
      this.entries.push(...diffEntries);
      return diffEntries;
    } else {
      const relativeModule = path.relative(this.appContext, replaceExt(module, ''));
      const isExistence = this.entries.includes(relativeModule);
      if (!isExistence) return undefined;
      const moduleEntries = [];
      this.addEntries(this.appContext, relativeModule, moduleEntries);
      const diffModuleEntries = difference(moduleEntries, this.entries);
      return diffModuleEntries;
    }
  }

  applyRoutes() {
    try {
      const routes = {};
      const appPath = path.resolve(this.appContext, 'app.json');
      const content = fs.readFileSync(appPath, 'utf8');
      const { pages = [], subpackages = [] } = JSON.parse(content);
      const { length: pagesLength } = pages;
      if (!pagesLength) {
        console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red('ERROR: "app.json" pages字段缺失,生成主包页面路由失败'));
        process.exit();
      }
      pages.forEach((page) => {
        const temp = page.split('/');
        const { length: tempLength } = temp;
        routes[`${temp[tempLength - 2]}`] = page;
      });
      const { length: subpackagesLength } = subpackages;
      if (!subpackagesLength) return routes;
      subpackages.forEach((subPackage) => {
        const { root, pages: subPages = [] } = subPackage;
        if (!root) {
          console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red('ERROR: "app.json" 分包配置中root字段缺失,生成分包页面路由失败'));
          return undefined;
        }
        const { length: subPagesLength } = subPages;
        if (!subPagesLength) {
          console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red(`ERROR: "app.json" 当前分包 "${root}" 中pages字段为空,生成 ${root} 分包页面路由失败`));
          return undefined;
        }
        subPages.forEach((subPage) => {
          const subPageTemp = subPage.split('/');
          const { length: subPageTempLength } = subPageTemp;
          routes[`${root}_${subPageTemp[subPageTempLength - 2]}`] = `${root}/${subPage}`;
        });
      });
      return routes;
    } catch (e) {
      console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red('ERROR: "app.json" 文件内容读取失败'));
      process.exit();
    }
  }
}

module.exports = EntryExtractPlugin;
