const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const dayjs = require('dayjs');

const { PROJECT_PATH } = require('../dicts/dictionary');

function applyRoutes() {
  try {
    const routes = {};
    const appPath = path.resolve(PROJECT_PATH, 'src/app.json');
    const content = fs.readFileSync(appPath, { encoding: 'utf-8' });
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

module.exports = {
  applyRoutes,
};
