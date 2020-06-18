## 1.0.5 (2020-06-17)


### Features

* **webpack.config.js:** 更新引入入口生成插件语句 ([1e8d7c0](https://github.com/Oc-master/webpack-build-miniprogram/commit/1e8d7c0ca2a8b62da2139edbdba5e4dc7f3f983a))
* **webpack.config.js:** 重构入口构建插件逻辑,解决运行中添加组件需重新启动问题 ([2a28551](https://github.com/Oc-master/webpack-build-miniprogram/commit/2a28551371bb8e17b94cd71080db80f70a734451))



## 1.0.4 (2020-06-10)


### Bug Fixes

* **webpack.config.js:** 修复Banner插件插入语句错误导致app.js无法解析问题 ([a3ea43c](https://github.com/Oc-master/webpack-build-miniprogram/commit/a3ea43c8816e2a32f60c7b8f4746ae744b206f79))



## 1.0.3 (2020-06-09)


### Features

* **webpack.config.json:** 修改单位px转换为rpx比例 ([e9750ec](https://github.com/Oc-master/webpack-build-miniprogram/commit/e9750ecfe2dd2293cf6ab82d3e1a8480e9ecae5e))



## 1.0.2 (2020-05-19)


### Features

* **entry_extract_plugin.js:** 添加编译结束提醒 ([9c45f3b](https://github.com/Oc-master/webpack-build-miniprogram/commit/9c45f3b40140e175c9e1fe892a02c320091420d0))
* **package.json:** 添加@babel/plugin-transform-modules-commonjs依赖包 ([25a62b3](https://github.com/Oc-master/webpack-build-miniprogram/commit/25a62b37670dd7164c2812d04f133a241a5e8d09))
* **webpack.config.json:** 增加ES6模块转换为commonjs模块功能 ([5677b95](https://github.com/Oc-master/webpack-build-miniprogram/commit/5677b951109714693a656b2ea569d4b42d98db5b))



## 1.0.1 (2020-05-14)


### Bug Fixes

* **webpack.config.js:** 修复assets文件夹复制至目标目录层级不正确问题 ([eed8706](https://github.com/Oc-master/webpack-build-miniprogram/commit/eed8706b1926e84967883359449eab7d248f80fe))
* **webpack.config.js:** 修复全局变量$env无法正常读取问题 ([832f69d](https://github.com/Oc-master/webpack-build-miniprogram/commit/832f69dcad3d450affcf26c1281d767f7e96882f))


### Features

* **package.json:** 添加eslint-import-resolver-alias依赖包 解决Eslint对自定义路径报错问题 ([f05a6f1](https://github.com/Oc-master/webpack-build-miniprogram/commit/f05a6f13ca1aa2a19c1ede4b0039030ce69d97c2))
* **webpack.config.js:** 将环境变量添加为全局可访问变量 ([732744c](https://github.com/Oc-master/webpack-build-miniprogram/commit/732744c2e3e75fdd45604b9613d9808ee496109e))
* **webpack.config.js:** 添加脚本文件复制功能 ([7e02191](https://github.com/Oc-master/webpack-build-miniprogram/commit/7e0219135b6ad718e1dc54f49967f02cbc0224df))
* **webpack.config.js:** 设置平台默认值为wx 默认编译为微信小程序 ([3007552](https://github.com/Oc-master/webpack-build-miniprogram/commit/30075520d80b1fb208a9d6e48d1c0bdcb00119b4))



# 1.0.0 (2020-05-10)


### Bug Fixes

* **package.json:** 添加缺失依赖包shelljs ([28192b9](https://github.com/Oc-master/webpack-build-miniprogram/commit/28192b938156a267c506dacd0a4ea8ce0535a58d))
* **webpack.config.js:** 修复淘宝商家应用原生样式文件不进行检测问题 ([60aaf5e](https://github.com/Oc-master/webpack-build-miniprogram/commit/60aaf5e168ad778128072f3973728abe09c675ab))


### Features

* **entry_extract_plugin.js:** 完成构建入口生成插件 ([a0d7c5b](https://github.com/Oc-master/webpack-build-miniprogram/commit/a0d7c5b1ae9b56e1e6d6b74476dcf1202cf28c8a))
* **index.js:** 完成主入口脚本 ([2dbd9db](https://github.com/Oc-master/webpack-build-miniprogram/commit/2dbd9db2666adb17099e546f76ff7bfe546117b9))
* **index.js:** 更换env获取方式 ([d9afa98](https://github.com/Oc-master/webpack-build-miniprogram/commit/d9afa98bda15ae76dd4bb0905584c8b776e50fec))
* **package.json:** 初始化package.json文件 ([0043006](https://github.com/Oc-master/webpack-build-miniprogram/commit/0043006f1185a6d670270e2ae02553c872313dc5))
* **package.json:** 添加bin命令 ([b7d4c88](https://github.com/Oc-master/webpack-build-miniprogram/commit/b7d4c88e4e325719cc469e00fe08aec738ebade1))
* **package.json:** 添加eslint-plugin-import依赖包 ([dbdc479](https://github.com/Oc-master/webpack-build-miniprogram/commit/dbdc479db21917913dacb79a03ae1caeeb57eaea))
* **package.json:** 添加less依赖包 ([0ea9495](https://github.com/Oc-master/webpack-build-miniprogram/commit/0ea949502440f205497448f9c70206dac2dbf0f1))
* **package.json:** 添加postcss-loader postcss-pxtorpx依赖包 ([b4ec479](https://github.com/Oc-master/webpack-build-miniprogram/commit/b4ec479bffc05925614784285e3a6f55c2527b43))
* **package.json:** 添加stylelint stylelint-webpack-plugin依赖包 ([297f2a9](https://github.com/Oc-master/webpack-build-miniprogram/commit/297f2a97cecfa100c917cf43f148f71c21143330))
* **package.json:** 添加基础策略所需依赖包 ([77931de](https://github.com/Oc-master/webpack-build-miniprogram/commit/77931de08443553a8af50416628860919eb53de3))
* **package.json:** 添加处理样式所需依赖包 ([b493d68](https://github.com/Oc-master/webpack-build-miniprogram/commit/b493d684fe09b541f90144357c635bab865ab53a))
* **webpack.config.js:** 增加样式单位转换功能pxtorpx ([6411539](https://github.com/Oc-master/webpack-build-miniprogram/commit/641153959c62078aefe6a598ba0fee68eb2c2994))
* **webpack.config.js:** 增加通过平台参数生成相应样式文件功能 ([6323d47](https://github.com/Oc-master/webpack-build-miniprogram/commit/6323d474bfff5f3d1fb616ac0a181b028678711f))
* **webpack.config.js:** 完成js检测及编译功能 ([93e2a73](https://github.com/Oc-master/webpack-build-miniprogram/commit/93e2a737bcfbfaf00f76f1b069a0259d1315dcba))
* **webpack.config.js:** 更改生产模式下source-mp模式 ([c81fbf5](https://github.com/Oc-master/webpack-build-miniprogram/commit/c81fbf5d55c92dbe481d0a206447a9ff39917799))
* **webpack.config.js:** 添加less预编译处理功能 ([fbb6cf7](https://github.com/Oc-master/webpack-build-miniprogram/commit/fbb6cf7a7d049ded96df359863c0fcbb1392030f))
* **webpack.config.js:** 添加stylelint检测修复功能 ([9afce5d](https://github.com/Oc-master/webpack-build-miniprogram/commit/9afce5d8441d5767ffb7a7873d5301223c767c39))
* **webpack.config.js:** 添加别名配置 ([9d7bf70](https://github.com/Oc-master/webpack-build-miniprogram/commit/9d7bf704604102837b5e328d9621955a5891f865))
* **webpack.config.js:** 添加复制功能插件 ([175446d](https://github.com/Oc-master/webpack-build-miniprogram/commit/175446d10b9da42b4d6508a4959c3809e9dd61f9))
* **webpack.config.js:** 添加开发模式watch功能 ([e09d163](https://github.com/Oc-master/webpack-build-miniprogram/commit/e09d1632992f839c163b440526821252cd20f4e0))
* **webpack.config.js:** 调整生产模式下所用的source-map类型 ([9d3df8e](https://github.com/Oc-master/webpack-build-miniprogram/commit/9d3df8ebf9950d0e1eff8f3808298de88f16809b))
