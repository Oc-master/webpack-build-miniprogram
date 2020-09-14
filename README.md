# webpack-build-miniprogram

一套即开即用的微信小程序构建方案，应用 webpack 构建工具为原生小程序项目提供扩展能力，该工具提供了以下能力：

- 路径别名 @ 功能，@ 符号指代 src 目录
- 样式预编译功能，提供 less 语法转换与单位 px 转换 rpx 功能
- 编码规范检测功能，提供 ESLint 和 StyleLint 检查功能
- 提供常用全局变量 `mc` 访问功能，详细属性请见下方
- 路由工具包注入功能，需在微信小程序项目中下载 `medusa-wx-router` 包
- 环境变量读取功能，提供 `.env` 文件配置功能
- webpack 配置扩展功能

## Installation

```shell
$ npm install webpack-build-miniprogram --save-dev
```

## Usage

请将小程序的源代码放置在 `src` 文件夹下，配置以下脚本命令，即可使用本套构建工具。推荐使用下方展示的目录结构，以获得更好的开发体验：

```
|-- dist                        编译结果目录
|-- src                         源代码目录
|   |-- app.js                  项目入口文件
|   |-- app.json                小程序配置文件
|   |-- sitemap.json            sitemap配置文件
|   |-- assets                  静态资源存放目录
|   |   |-- .gitkeep
|   |-- components              公共组件存放目录
|   |   |-- .gitkeep
|   |-- dicts                   公共字典存放目录
|   |   |-- .gitkeep
|   |-- libs                    第三方工具库存放目录（外部引入）
|   |   |-- .gitkeep
|   |-- pages                   页面文件存放目录
|   |   |-- index
|   |       |-- index.js
|   |       |-- index.json
|   |       |-- index.less
|   |       |-- index.wxml
|   |-- scripts                 公共脚本存放目录（wxs）
|   |   |-- .gitkeep
|   |-- services                API服务存放目录
|   |   |-- .gitkeep
|   |-- styles
|   |   |-- index.less          项目总通用样式
|   |   |-- theme.less          项目主题样式
|   |-- templates               公共模板存放目录
|   |   |-- .gitkeep
|   |-- utils                   公共封装函数存放目录（自我封装）
|       |-- .gitkeep
|-- config.yaml                 编译配置文件
|-- .env                        环境变量配置文件
|-- webpack.config.js           webpack 配置扩展文件
|-- project.config.json         开发者工具配置文件
└── package.json
```

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
# 当前项目应用平台
platform: wx
# 样式单位 px 转换 rpx 的比例设定
css_unit_ratio: 1
# 域名配置
{env}_host:
  api: https://www.miniprogram.dev.com
```

## Global Variable

该工具当中注入了一个全局对象 `mc` ，它包含了三个属性：

* `$env`：运行时环境变量，对应了脚本中配置的 {env} 的值
* `$routes`：路由映射字典，该字典中的每个`key`取自`pages`文件夹的名称，`value`取自`app.json`中的配置，你可以通过`mc.$routes.index`来替代`pages/index/index`字符串。
* `$hosts`：域名配置对象，当项目根目录中没有配置`config.yaml`时，该对象是一个没有属性的空对象。存在配置文件时，构建工具会根据环境自动将配置读取到对象中，上述例子配置文件中，你可以使用`mc.$hosts.api`访问到`https://www.miniprogram.dev.com`域名。

## License

[MIT](https://github.com/Oc-master/webpack-build-miniprogram/blob/master/LICENSE)
