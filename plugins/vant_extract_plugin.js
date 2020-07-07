const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const chalk = require('chalk');
const { difference } = require('lodash');
const replaceExt = require('replace-ext');

const { PROJECT_PATH } = require('../dicts/dictionary');

class VantExtractPlugin {
  constructor({ context }) {
    this.appContext = context;
    this.vantContext = path.resolve(PROJECT_PATH, 'node_modules');
    this.initialEntries = [];
    this.entries = [];
  }

  apply(compiler) {
    /** 第一次启动构建，生成初始构建入口 */
    compiler.hooks.entryOption.tap('EntryExtractPlugin', () => {
      this.applyFirstEntries();
      this.copyVant();
    });

    compiler.hooks.watchRun.tap('VantExtractPlugin', (params) => {
      console.log(params);
    });
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
    const isVant = absolutePath.indexOf('vant') !== -1;
    if (isVant) return { isQualification: false, isContinue: false };
    const jsPath = replaceExt(absolutePath, '.js');
    const isQualification = fs.existsSync(jsPath);
    const jsonPath = replaceExt(absolutePath, '.json');
    const isContinue = fs.existsSync(jsonPath);
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
      c
    }
  }

  /**
   * 获取初始的入口数组（未处理）
   * @return {Array} entries 从 app.json 中收集的初始入口数组
   */
  getInitialEntries() {
    try {
      const appPath = path.resolve(this.appContext, 'app.json');
      const content = fs.readFileSync(appPath, { encoding: 'utf-8' });
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

  getInitialVantEntries(entries) {
    const vantEntries = entries.reduce((acc, entry) => {
      const jsonPath = path.resolve(this.appContext, replaceExt(entry, '.json'));
      const content = fs.readFileSync(jsonPath, { encoding: 'utf-8' });
      const { usingComponents = {} } = JSON.parse(content);
      const components = Object.values(usingComponents);
      const { length } = components;
      if (!length) return acc;
      const temp = components.filter((item) => item.indexOf('vant') !== -1);
      return [...acc, ...temp];
    }, []);
    return vantEntries;
  }

  getVantDirs(context, modulePath, dirs) {
    const isAbsolute = modulePath[0] === '/';
    const absolutePath = isAbsolute ? path.resolve(this.vantContext, modulePath.slice(1)) : path.resolve(context, modulePath);
    const jsonPath = replaceExt(absolutePath, '.json');
    const dir = path.dirname(jsonPath);
    dirs.push(dir);
    try {
      const content = fs.readFileSync(jsonPath, { encoding: 'utf-8' });
      const { usingComponents = {} } = JSON.parse(content);
      const components = Object.values(usingComponents);
      const { length } = components;
      if (length) {
        components.forEach((component) => this.getVantDirs(dir, component, dirs));
      }
    } catch (e) {
      console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red(`ERROR: "${jsonFile}" 文件内容读取失败`));
    }
  }

  copyVant() {
    const initialVantEntries = this.getInitialVantEntries(this.entries);
    const dirs = [];
    initialVantEntries.forEach((item) => this.getVantDirs(_, item, dirs));
    console.log(dirs);
  }
}

module.exports = VantExtractPlugin;
