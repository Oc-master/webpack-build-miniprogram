const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const { PROJECT_PATH, OPERATING_ENV } = require('../dictionary');

/**
 * 生成路由映射对象
 */
function applyRoutes() {
  try {
    const routes = {};
    const appPath = path.resolve(PROJECT_PATH, 'src/app.json');
    const content = fs.readFileSync(appPath, { encoding: 'utf-8' });
    const { pages = [], subpackages = [] } = JSON.parse(content);
    const { length: pagesLength } = pages;
    if (pagesLength) {
      pages.forEach((page) => {
        const temp = page.split('/');
        const { length: tempLength } = temp;
        routes[`${temp[tempLength - 2]}`] = page;
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
        const subPageTemp = subPage.split('/');
        const { length: subPageTempLength } = subPageTemp;
        routes[`${root}`][`${subPageTemp[subPageTempLength - 2]}`] = `${root}/${subPage}`;
      });
    });
    return routes;
  } catch (e) {
    return {};
  }
}

function isProduction() {
  return OPERATING_ENV === 'production';
}

function getConfig() {
  try {
    const configPath = path.resolve(PROJECT_PATH, 'config.yaml');
    const content = fs.readFileSync(configPath, { encoding: 'utf-8' });
    return yaml.load(content);
  } catch(e) {
    return { platform: 'wx', css_unit_ratio: 1 };
  }
}

module.exports = {
  applyRoutes,
  isProduction,
  getConfig,
};
