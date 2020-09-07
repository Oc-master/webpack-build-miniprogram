const fs = require('fs');
const yaml = require('js-yaml');

const { CONFIG, DEFAULT_CONFIG, APP_CONFIG } = require('./dicts');

exports.yamlConfig = (function() {
  try {
    /** 将 yaml 格式的内容解析为 object 对象 */
    const config = yaml.load(fs.readFileSync(CONFIG, { encoding: 'utf-8' }));
    return config;
  } catch(error) {
    return DEFAULT_CONFIG;
  }
})();

exports.routes = (function() {
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
  } catch(error) {
    return {};
  }
})();
