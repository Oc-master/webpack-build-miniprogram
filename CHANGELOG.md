## [2.0.2](https://github.com/Oc-master/webpack-build-miniprogram/compare/2.0.1...2.0.2) (2021-01-20)


### Bug Fixes

* **config/webpack.common.js:** 修复medusa-loader引用问题 ([d0c406e](https://github.com/Oc-master/webpack-build-miniprogram/commit/d0c406ea0950060ed60dd4e61dc963c2cea4bca4))



## [2.0.1](https://github.com/Oc-master/webpack-build-miniprogram/compare/2.0.0...2.0.1) (2021-01-20)


### Bug Fixes

* **config/webpack.common.js:** 修复medusa-loader配置参数配置错误问题 ([867ab75](https://github.com/Oc-master/webpack-build-miniprogram/commit/867ab751141bfe772fa71ecdd6e92fab94c50344))


### Features

* **config/webpack.common.js:** 添加ms文件解析loader ([54bc9f5](https://github.com/Oc-master/webpack-build-miniprogram/commit/54bc9f534e14b07e98a923597bb2005eabcdd6e6))
* **package.json:** 升级依赖 ([ee98e9e](https://github.com/Oc-master/webpack-build-miniprogram/commit/ee98e9e3d66ae6e86669f7cff6d7f503c255bbe7))
* **webpack.config.js:** 更新medusa-loader配置 ([f5c15f0](https://github.com/Oc-master/webpack-build-miniprogram/commit/f5c15f00e111523bd5f2e9f40a76463021c6ac33))



# [2.0.0](https://github.com/Oc-master/webpack-build-miniprogram/compare/1.3.0...2.0.0) (2021-01-05)


### Bug Fixes

* **config/webpack.common.js:** 修复MS_ROUTES无法正常读取问题 ([96c2528](https://github.com/Oc-master/webpack-build-miniprogram/commit/96c25282151a1e7cf3bf24029e94756d2450b68e))


### Features

* 更换全局变量、路由函数前置命名 ([b9359fb](https://github.com/Oc-master/webpack-build-miniprogram/commit/b9359fbd8d7968b44b12f979d871aff465ff8cf1))



# [1.3.0](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.1.2...v1.3.0) (2021-01-05)


### Bug Fixes

* **config.webpack.part.js:** 修复windows系统下分包公共提取部分功能正则异常问题 ([dc7e132](https://github.com/Oc-master/webpack-build-miniprogram/commit/dc7e1324339384e047ffd59355c5ebf120d5aa73))


### Features

* **config/webpack.common.js:** 完成medusa-wx-toast自动注入功能 ([4d992bc](https://github.com/Oc-master/webpack-build-miniprogram/commit/4d992bcd1e438fa28dcd439e6b5d479d5955ca84))



## [1.2.4](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.1.2...v1.2.4) (2020-10-21)


### Features

* 完成CommonBannerPlugin应用 ([b03ec5b](https://github.com/Oc-master/webpack-build-miniprogram/commit/b03ec5befe1eab08e02d1ca33a781eebac87e477))
* **plugins/:** 完成CommonBannerPlugin插件 ([354d1cf](https://github.com/Oc-master/webpack-build-miniprogram/commit/354d1cf247820d0ad11e3cf210bcf9f63b92c2ff))



## [1.2.3](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.1.2...v1.2.3) (2020-09-25)


### Features

* **config/webpack.common.js:** 添加自动加载文件别名.ts ([1d1ac6f](https://github.com/Oc-master/webpack-build-miniprogram/commit/1d1ac6f9d15cc3870c6386ff69aede7ade30ca38))
* **package.json:** 添加typescript和ts-loader依赖包 ([c7fe7bd](https://github.com/Oc-master/webpack-build-miniprogram/commit/c7fe7bdfd710debf023a6949dd84bdd446417c6a))



## [1.2.2](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.1.2...v1.2.2) (2020-09-16)


### Features

* **package.json:** 更新entry-extract-webpack-plugin依赖包版本号 ([b95c8b1](https://github.com/Oc-master/webpack-build-miniprogram/commit/b95c8b17f03fc55939561d23030601a297bdd6d1))



## [1.2.1](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.1.2...v1.2.1) (2020-09-14)


### Bug Fixes

* **libs/dicts.js:** 修复NODE_ENV变量读取有误问题 ([d82daee](https://github.com/Oc-master/webpack-build-miniprogram/commit/d82daee6d2083ffc7e545fd24cbdaf40ae2f1c4d))


### Features

* **config/webpack.common.js:** 关闭.env文件读取异常提示功能 ([2f27d6f](https://github.com/Oc-master/webpack-build-miniprogram/commit/2f27d6f8915e01c1169d1e3740b14e0d49a81da6))
* **config/webpack.common.js:** 添加读取公共env文件生成全局变量功能 ([5aaccbc](https://github.com/Oc-master/webpack-build-miniprogram/commit/5aaccbc0b606c4dc1af0df5fae3fc267fd170c2c))
* **config/webpack.common.js:** 调整commons模块打包优先级 ([0a3cff4](https://github.com/Oc-master/webpack-build-miniprogram/commit/0a3cff4031f7d1252603f9291694b8e6ba1a82ba))
* **libs/dicts.js:** 添加env文件路径字典 ([abc2691](https://github.com/Oc-master/webpack-build-miniprogram/commit/abc2691b06b76e3da77420af6f1bad152ca7d57a))
* **package.json:** 添加dotenv-webpack工具 ([50d997d](https://github.com/Oc-master/webpack-build-miniprogram/commit/50d997d62906eb77a54dcbe184194204b12d61f5))
* 添加读取webpack扩展配置功能 ([3fe5ba6](https://github.com/Oc-master/webpack-build-miniprogram/commit/3fe5ba615d005f1cce78ff3ef6bb63de12a87e64))



# [1.2.0](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.1.2...v1.2.0) (2020-09-08)


### Bug Fixes

* **config/webpack.config.js:** 修复webpack-merge模块导入语法错误问题 ([0c05f0d](https://github.com/Oc-master/webpack-build-miniprogram/commit/0c05f0dd0ab5963f0f3911a2bd5a72b351f79ca3))
* **webpack.config.js:** 修复字典名称错误导致样式输出失败问题 ([8fe643b](https://github.com/Oc-master/webpack-build-miniprogram/commit/8fe643b2cdd09e11ad698cdaa5510755fe335496))


### Features

* 抽离公共策略 ([3a340ec](https://github.com/Oc-master/webpack-build-miniprogram/commit/3a340ec233813c699338bb346c10db6198770ed8))
* **config/:** 添加样式部件分离功能 ([7a9d238](https://github.com/Oc-master/webpack-build-miniprogram/commit/7a9d23841696034f8b03d64474e47258c8a2caf3))
* **config/webpack.common.js:** 更改公共抽离策略 ([200376d](https://github.com/Oc-master/webpack-build-miniprogram/commit/200376da7708e7f12a0651c1a1b02c76890b7f08))
* **libs/dicts.js:** 更改字典存放位置 ([0cafd36](https://github.com/Oc-master/webpack-build-miniprogram/commit/0cafd364c8c7f7491af13d85bd4e5ac8947bc8cf))
* **libs/index.js:** 调整config.yaml配置对象和routes路由对象生成方法 ([7c76daa](https://github.com/Oc-master/webpack-build-miniprogram/commit/7c76daa1b0522d418acc947380a6e0aaf470136f))
* **package.json:** 添加webpack-merge依赖 ([b5ef3d7](https://github.com/Oc-master/webpack-build-miniprogram/commit/b5ef3d7eaa6bde19d120cf87e367d6cbc3abe3e0))
* **webpack.config.js:** 添加routerTo功能自动import功能 ([f0c490a](https://github.com/Oc-master/webpack-build-miniprogram/commit/f0c490a1e1cfd2ef20045c6a7b43fc55cb05a469))
* **webpack.config.js:** 配合字典及配置对象更改调整 ([37ded29](https://github.com/Oc-master/webpack-build-miniprogram/commit/37ded295b0a8180e12a350ee6d0fa3b230c77a1d))



## [1.1.5](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.1.2...v1.1.5) (2020-08-25)


### Features

* **package.json:** 锁定自研依赖版本号 添加chalk dayjs progress-bar-webpack-plugin依赖 ([f86b88e](https://github.com/Oc-master/webpack-build-miniprogram/commit/f86b88e5e6b5049d08794a4331c9c380f05ead02))
* **webpack.config.js:** 添加加载过程提示功能 ([553dc63](https://github.com/Oc-master/webpack-build-miniprogram/commit/553dc631abae21753a567350d486561ce6dadd34))



## [1.1.4](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.1.2...v1.1.4) (2020-08-19)


### Features

* **webpack.config.js:** 完成路由功能自动注入功能 ([374b3ba](https://github.com/Oc-master/webpack-build-miniprogram/commit/374b3bacdd0fcabe167892df94f0ea3ca48c7083))



## [1.1.3](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.1.2...v1.1.3) (2020-08-18)


### Features

* **.gitignore:** update .gitignore ([f1e3232](https://github.com/Oc-master/webpack-build-miniprogram/commit/f1e3232ff85b3b546951015d38333c32d30e170c))
* **webpack.config.js:** 应用ESLint错误提示格式化输出功能 ([da40b72](https://github.com/Oc-master/webpack-build-miniprogram/commit/da40b726f9222cd6461f374a005e105c94e4cae9))
* **webpack.config.js:** 更改devtool工具为none ([682c12d](https://github.com/Oc-master/webpack-build-miniprogram/commit/682c12d986afba993d5254ef64da8ceb504ece2f))



## [1.1.2](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.1.1...v1.1.2) (2020-07-22)


### Features

* **dictionary/index.js:** 添加DEFAULT_CONFIG常量 ([32e8c40](https://github.com/Oc-master/webpack-build-miniprogram/commit/32e8c40ed410c2a9cf29c5fff42b1291226b16e1))
* **package.json:** 升级entry-extract-webpack-plugin依赖包 ([23c8aab](https://github.com/Oc-master/webpack-build-miniprogram/commit/23c8aabdad75a49e48843904235264bd52b93895))
* **package.json:** 添加stylus stylus-loader依赖 ([bb75ce9](https://github.com/Oc-master/webpack-build-miniprogram/commit/bb75ce982405f00f7da9e41ee22b791a887d9090))
* **utils/index.js:** 为getConfig函数添加默认返回值,做容错处理 ([53bb533](https://github.com/Oc-master/webpack-build-miniprogram/commit/53bb533a79a156be6bd1cbb8413e8107c529f8c3))
* **webpack.config.js:** 添加UI组件生成功能 ([cdbf5d3](https://github.com/Oc-master/webpack-build-miniprogram/commit/cdbf5d3c5921c7fa93aac5f01590f65729701fe0))
* **webpack.config.js:** 配置copy-webpack-plugin插件忽略匹配vant文件夹下的内容 ([b9d1614](https://github.com/Oc-master/webpack-build-miniprogram/commit/b9d161415a4f8888bb84a4be27455840f6d56b52))



## [1.1.1](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.1.0...v1.1.1) (2020-07-16)


### Features

* **dictionary/index.js:** 添加DEFAULT_CONFIG常量 ([99cf6be](https://github.com/Oc-master/webpack-build-miniprogram/commit/99cf6beb955be2c23c43c30b98857e89a7d9ea1a))
* **package.json:** 升级entry-extract-webpack-plugin依赖 ([1e2d693](https://github.com/Oc-master/webpack-build-miniprogram/commit/1e2d693c2c9cdadcf68e5206a3c329db720e23f7))
* **utils/index.js:** 为getConfig函数添加默认返回值,做容错处理 ([3abd6b3](https://github.com/Oc-master/webpack-build-miniprogram/commit/3abd6b3887e7f87c3306af18b9ff95d25999b02d))



## [1.0.12](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.0.11...v1.0.12) (2020-07-13)


### Bug Fixes

* **webpack.config.js:** 修复@babel/plugin-proposal-class-properties插件运作异常问题 ([8b305f2](https://github.com/Oc-master/webpack-build-miniprogram/commit/8b305f2bd7917e47764853acb56dacb3ff79b9a5))



## [1.0.11](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.0.10...v1.0.11) (2020-07-09)


### Features

* **webpack.config.js:** 添加@babel/plugin-proposal-class-properties依赖包,解析class新语法功能 ([1b29a4f](https://github.com/Oc-master/webpack-build-miniprogram/commit/1b29a4f45286a3776c85e38382c9ab2c3220160d))



## [1.0.10](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.0.9...v1.0.10) (2020-07-01)


### Bug Fixes

* **dicts/dictionary.js:** 修复字典映射配置出错问题 ([e864228](https://github.com/Oc-master/webpack-build-miniprogram/commit/e8642289ed5c890e017b98abbb7b748ffb548cd7))


### Features

* **dicts/dictionary.js:** 更改字典,添加模板文件映射 ([065ab58](https://github.com/Oc-master/webpack-build-miniprogram/commit/065ab58d5ded1696e37bd49a409d2ee91f56e4b2))
* **index.js:** 每次触发构建时删除旧的dist文件夹 ([480cb2b](https://github.com/Oc-master/webpack-build-miniprogram/commit/480cb2bc8a3cba9d9732112cc306b132a67e30ef))
* **webpack.config.js:** 完善入口生成插件读取platform配置,修改模板文件检测目标 ([018b78b](https://github.com/Oc-master/webpack-build-miniprogram/commit/018b78b3a9b2072cf5d79d4949ef1bf170e5c224))



## [1.0.9](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.0.7...v1.0.9) (2020-06-29)


### Features

* **utils/index.js:** 更改分包$routes变量的数据结构 ([682d1db](https://github.com/Oc-master/webpack-build-miniprogram/commit/682d1db8f7201cc07925c4e2d514082a50a51c15))



## [1.0.8](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.0.7...v1.0.8) (2020-06-29)


### Bug Fixes

* **dicts/dictionary.js:** 修复环境变量读取失败问题 ([d2ed915](https://github.com/Oc-master/webpack-build-miniprogram/commit/d2ed915cb251087936d92b484522f9c71d7f816d))
* **webpack.config.js:** 修复eslint缓存导致配置文件更新无效问题 ([fabae42](https://github.com/Oc-master/webpack-build-miniprogram/commit/fabae4293bfed9e27454e732e5fbc1d00a6c368a))


### Features

* **dictionary.js:** 添加字典管理文件 ([5e9416d](https://github.com/Oc-master/webpack-build-miniprogram/commit/5e9416d5f2ec98860bf8064fb1a0606ce1aa465c))
* **index.js:** 添加yaml转换js对象功能 ([6b0a26f](https://github.com/Oc-master/webpack-build-miniprogram/commit/6b0a26fb83e08e7e7ca5c66ca9056f327883d600))
* **index.js webpack.config.js:** 添加读取配置文件功能,添加全局变量$hosts ([1f70e84](https://github.com/Oc-master/webpack-build-miniprogram/commit/1f70e84cd497e5f0c8f7881e7e23f1dc677c013c))
* **package.json:** 添加js-yaml依赖包 ([aeed1e7](https://github.com/Oc-master/webpack-build-miniprogram/commit/aeed1e7a2beae1bc3e12df9cf9ad9ca36b50ed61))
* 重新划分字典和插件的目录结构 ([41e4b9f](https://github.com/Oc-master/webpack-build-miniprogram/commit/41e4b9f87831be4af527be796ed5bf3e4b8243b9))
* **utils/index.js:** 增加全局变量$routes生成函数 ([fdccd86](https://github.com/Oc-master/webpack-build-miniprogram/commit/fdccd8692bf9c09612ae1cc947f9c012cb1c04b9))
* **webpack.config.js:** 添加mc全局变量 ([01a779d](https://github.com/Oc-master/webpack-build-miniprogram/commit/01a779d98c79254eb3787fac8720ff75b87bef0b))



## [1.0.7](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.0.5...v1.0.7) (2020-06-19)


### Features

* **entry_extract_plugin.js:** 添加生成路由映射字典功能 ([4cdca53](https://github.com/Oc-master/webpack-build-miniprogram/commit/4cdca534a3db276630fe00ce3b4ae808a86d1518))
* **webpack.config.js:** 去除babel转换ES6语法功能 ([358ebf5](https://github.com/Oc-master/webpack-build-miniprogram/commit/358ebf52e9ddae13eae13cadc1ae623a6c6661f6))



## [1.0.6](https://github.com/Oc-master/webpack-build-miniprogram/compare/v1.0.5...v1.0.6) (2020-06-19)


### Bug Fixes

* **entry_extract_plugin.js:** 修复非json文件引起重新构建入口时forEach报错问题 ([4f66a0d](https://github.com/Oc-master/webpack-build-miniprogram/commit/4f66a0d7208ae7866ec8a020cb7bab1ea099696b))


### Features

* **entry_extract_plugin.js:** 修改编译完成时输出内容 ([2fbf3fe](https://github.com/Oc-master/webpack-build-miniprogram/commit/2fbf3fefe2bda414acc856b7fb252c6a6ca8c972))
* **entry_extract_plugin.js:** 添加weui组件忽略加入入口构建功能 ([5bbe4e4](https://github.com/Oc-master/webpack-build-miniprogram/commit/5bbe4e4d37085d95ceb24c8007fa01ba83f94f34))
* **entry_extract_plugin.js:** 添加终端显示时间功能 ([40e5180](https://github.com/Oc-master/webpack-build-miniprogram/commit/40e518034c5ff5ea7941931a93f59dc894b414e0))
* **entry_extract_plugin.js:** 添加自动生成commons.js文件功能 ([6aed0c8](https://github.com/Oc-master/webpack-build-miniprogram/commit/6aed0c8af624d9841acfc0de02f0fb213632f140))
* **webpack.config.js:** 增加px转换为rpx的比例设定功能 ([848cfef](https://github.com/Oc-master/webpack-build-miniprogram/commit/848cfef902c3aefec16cb1e2a9773d1b2af652b4))



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



## 1.0.0 (2020-05-10)


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
