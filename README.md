# webpack-build-miniprogram

一套即开即用的小程序构建方案，应用webpack构建工具为原生小程序项目提供扩展能力，该工具提供了以下能力：

* 样式预编译，提供less语法编译功能
* 代码规范检测，提供ESLint和StyleLint工具检查能力
* 注入常用的全局变量 `mc`，详细属性请见下方
* 路径别名 `@` 功能，解决相对路径更改目录结构时修改代码繁琐的问题

## Installation

```shell
$ npm install webpack-build-miniprogram --save
```

## Usage

请将小程序的源代码放置在 `src`文件夹下，配置以下脚本命令，即可使用本套构建工具。

### npm script

```json
/* package.json */
"scripts": {
  "{script}": "medusa-server {env}"
}
```

### example

```json
/* package.json */
"scripts": {
  "dev": "medusa-server development",
  "build": "medusa-server production"
}
```

### Tips

1. 请将完整的项目导入到开发者工具中查看效果。
2. `project.config.json`文件请放置在项目根目录下，并在其中将 `miniprogramRoot` 属性配置为 `dist`。

## Config File

该工具还可配套 `config.yaml` 配置文件一同使用，通过配置文件我们可以为构建提供一些额外的能力，如需使用请在项目的根目录下创建该文件（该文件为可选配置），例：

```yaml
# 样式单位 px 转换 rpx 的比例设定
css_unit_ratio: 1
# 当前项目应用平台，可选择wx或swan，当设置为swan时将构建出应用于百度平台的目标代码
platform: wx
# 域名配置
{env}_host:
  api: https://www.miniprogram.dev.com
```

## Global Variable

该工具当中注入了一个全局对象 `mc` ，它包含了三个属性：

* `$env`：运行环境变量，对应了脚本中配置的 {env} 的值
* `$routes`：路由映射字典，该字典中的每个`key`取自`pages`文件夹的名称，`value`取自`app.json`中的配置，你可以通过`mc.$routes.index`来替代`pages/index/index`字符串。
* `$hosts`：域名配置对象，当项目根目录中没有配置`config.yaml`时，该对象是一个没有属性的空对象。存在配置文件时，构建工具会根据环境自动将配置读取到对象中，上述例子配置文件中，你可以使用`mc.$hosts.api`访问到`https://www.miniprogram.dev.com`域名。

## License

[MIT](https://github.com/Oc-master/webpack-build-miniprogram/blob/master/LICENSE)

### keywords

`webpack` `wx` `swan` `miniprogram`

