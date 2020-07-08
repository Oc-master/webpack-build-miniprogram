const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const chalk = require('chalk');
const replaceExt = require('replace-ext');

class VantExtractPlugin {
  constructor({ context, vantContext }) {
    this.context = context;
    this.vantContext = vantContext;
  }

  apply(compiler) {
    compiler.hooks.entryOption.tap('VantExtractPlugin', () => {
      const initialEntries = this.getInitialEntry();
      const fileSet = initialEntries.reduce((acc, item) => {
        const temp = [];
        this.createFileSet(this.context, item, temp);
        return [...acc, ...temp];
      }, []);
      console.log(fileSet);
      const vantEntries = this.getInitialVantEntries(fileSet);
      const vantFileSet = vantEntries.reduce((acc, item) => {
        const temp = [];
        this.createFileSet(this.vantContext, item, temp);
        return [...acc, ...temp];
      }, []);
      console.log(vantFileSet);
    });
  }

  convertToRelative(rootContext, context, pathAlias) {
    const isAbsolute = pathAlias[0] === '/';
    const absolutePath = isAbsolute ? path.resolve(rootContext, pathAlias.slice(1)) : path.resolve(context, pathAlias);
    return path.relative(rootContext, absolutePath);
  }

  getInitialEntry() {
    const appJsonPath = path.resolve(this.context, 'app.json');
    try {
      const initialEntries = [];
      const content = fs.readFileSync(appJsonPath, { encoding: 'utf-8' });
      const { pages = [], usingComponents = {}, subpackages = [] } = JSON.parse(content);
      const { length: pagesLength } = pages;
      pagesLength && initialEntries.push(...pages);
      const components = Object.values(usingComponents);
      const { length: componentsLength } = components;
      componentsLength && initialEntries.push(...components);
      const { length: subpackagesLength } = subpackages;
      if (subpackagesLength) {
        const temp = subpackages.reduce((acc, subpackage) => {
          const { pages: subpackagePages = [] } = subpackage;
          const { length } = subpackagePages;
          if (!length) return acc;
          return [...acc, ...subpackagePages];
        }, []);
        initialEntries.push(...temp);
      }
      return initialEntries.map((item) => this.convertToRelative(this.context, this.context, item));
    } catch(error) {
      console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red('ERROR: "app.json" 文件内容读取失败'));
    }
  }

  createFileSet(context, relativePath, fileSet) {
    const absolutePath = path.resolve(context, replaceExt(relativePath, '.json'));
    const isQualification = fs.existsSync(absolutePath);
    if (!isQualification) return undefined;
    fileSet.push(absolutePath);
    try {
      const content = fs.readFileSync(absolutePath, { encoding: 'utf-8' });
      const { usingComponents = {} } = JSON.parse(content);
      const components = Object.values(usingComponents);
      const { length: componentsLength } = components;
      if (componentsLength) {
        const moduleContext = path.dirname(absolutePath);
        components.forEach((component) => {
          const relativePath = this.convertToRelative(context, moduleContext, component);
          this.createFileSet(context, relativePath, fileSet);
        });
      }
    } catch(e) {
      console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red(`ERROR: "${absolutePath}" 文件内容读取失败`));
    }
  }

  getInitialVantEntries(entries) {
    const fileSet = entries.reduce((acc, item) => {
      try {
        const content = fs.readFileSync(item, { encoding: 'utf-8' });
        const { usingComponents = {} } = JSON.parse(content);
        const components = Object.values(usingComponents);
        const { length: componentsLength } = components;
        if (!componentsLength) return acc;
        const temp = components.filter((component) => component.indexOf('vant') !== -1);
        return [...acc, ...temp];
      } catch(e) {
        console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red(`ERROR: 文件内容读取失败`));
      }
    });
    return fileSet;
  }
}

module.exports = VantExtractPlugin;
