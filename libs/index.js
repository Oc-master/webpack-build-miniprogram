const fs = require('fs');
const chalk = require('chalk');
const dayjs = require('dayjs');
const yaml = require('js-yaml');

const { CONFIG, DEFAULT_CONFIG, APP_CONFIG } = require('./dicts');

const warningLog = (message) => console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.yellow(`WARNING: ${message}`));

const errorLog = (message) => console.log(chalk.gray(`[${dayjs().format('HH:mm:ss')}]`), chalk.red(`ERROR: ${message}`));

exports.yamlConfig = (function () {
  try {
    /** 将 yaml 格式的内容解析为 object 对象 */
    const config = yaml.load(fs.readFileSync(CONFIG, { encoding: 'utf-8' }));
    return config;
  } catch (error) {
    return DEFAULT_CONFIG;
  }
})();

exports.routes = (function () {
  try {
    const routes = {};
    const content = JSON.parse(fs.readFileSync(APP_CONFIG, { encoding: 'utf-8' }));
    const { pages = [], subpackages = [] } = content;
    const { length: pagesLength } = pages;
    if (pagesLength) {
      pages.forEach((page) => {
        const key = page.split('/').splice(-2, 1);
        routes[`${key}`] = page;
      });
    }
    const { length: subpackagesLength } = subpackages;
    if (!subpackagesLength) return routes;
    subpackages.forEach((subPackage) => {
      const { root, pages: subPages = [] } = subPackage;
      if (!root) {
        return undefined;
      }
      const { length: subPagesLength } = subPages;
      if (!subPagesLength) {
        return undefined;
      }
      routes[`${root}`] = {};
      subPages.forEach((subPage) => {
        const key = subPage.split('/').splice(-2, 1);
        routes[`${root}`][`${key}`] = `${root}/${subPage}`;
      });
    });
    return routes;
  } catch (error) {
    return {};
  }
})();

exports.packages = (function () {
  try {
    const content = JSON.parse(fs.readFileSync(APP_CONFIG, { encoding: 'utf-8' }));
    const { subpackages = [] } = content;
    const { length: subpackagesLength } = subpackages;
    if (!subpackagesLength) return [];
    const packages = subpackages.map((subpackage) => subpackage.root);
    return packages;
  } catch (error) {
    return [];
  }
})();

exports.routesConfig = (function () {
  try {
    const routesConfig = {};
    const content = fs.readFileSync(APP_CONFIG, { encoding: 'utf-8' });
    const { pages = [], subpackages = [] } = JSON.parse(content);
    const mainPackageRoutes = pages.reduce((acc, page) => {
      const arr = page.split('/');
      const key = arr[arr.length - 2];
      if (acc[key]) {
        warningLog(`"${page}" 路由键值 ${key} 已被 "${acc[key]}" 占用`);
        return acc;
      }
      return { ...acc, [key]: page };
    }, {});
    Object.assign(routesConfig, { MS_ROUTES: JSON.stringify(mainPackageRoutes) });
    const { length: subpackagesLength } = subpackages;
    if (!subpackagesLength) return routesConfig;
    subpackages.forEach((item) => {
      const { root, pages } = item;
      if (!root) return undefined;
      const subPackageRoutes = pages.reduce((acc, page) => {
        const arr = page.split('/');
        const key = arr[arr.length - 2];
        if (acc[key]) {
          warningLog(`${root} 分包中 "${page}" 路由键值 ${key} 已被 "${acc[key]}" 占用`);
          return acc;
        }
        return { ...acc, [key]: page };
      }, {});
      Object.assign(routesConfig, { [`MS_ROUTES.${root}`]: JSON.stringify(subPackageRoutes) });
    });
    return routesConfig;
  } catch (err) {
    errorLog(err);
  }
})();
