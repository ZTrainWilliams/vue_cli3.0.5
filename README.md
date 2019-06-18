# vue_cli3.0.5_project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

1、vue_cli3.0.5追求简洁配置化，build和config文件夹等配置已废弃
2、webpack相关配置、端口及proxy代理服务配置需在文件夹根目录创建vue.config.js（package.json同级）
3、如需深入更改一些配置，可进入node_modules\@vue\cli-service\lib\config中进行查阅修改

###vue.config.js
``` javascript
module.exports = {
	baseUrl: './', // 部署应用包时的基本 URL
	outputDir: 'dist', // build 时生成的生产环境构建文件的目录
	// assetsDir: '', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
	indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)
	filenameHashing: true, // 文件名哈希
	lintOnSave: true, // eslint-loader 是否在保存的时候检查
	runtimeCompiler: true ,// 设置为 true 后你就可以在 Vue 组件中使用 template 选项
	productionSourceMap: false ,// 是否需要生产环境的 source map
	css: {
		sourceMap: false, // 是否为 CSS 开启 source map
	},
	devServer: { // 所有 webpack-dev-server 的选项都支持
		hot: true, // 热更新
		open: true,
		host: '0.0.0.0',
		port: 8888,
		https: false,
		hotOnly: false,
 		// proxy: {}, // 跨域代理
 	},
 	parallel: require('os').cpus().length > 1, // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
 	pwa: {}, // PWA 插件相关配置   see => https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	pluginOptions: {}, // 第三方插件配置
	configureWebpack: {
		module: {
			rules: [ // 可在package.json 配置顶层 sideEffects: false
				{
					test: /\.(js|jsx|vue)?$/,
					sideEffects: false // false | [] -> []放置不清除副作用文件
				}
			]
		},
		externals:{ // 在这里配置后，减少了压缩的包内容，需要在public/index.html通过cdn方式再引入,注意对应的版本
			vue: "Vue",
			vuex: "Vuex",
			"vue-router": "VueRouter",
			"element-ui": "ELEMENT"
		}
	}
}
```

### 命令生成组件/页面.vue文件
```javascript
npm run new:comp

npm run new:view
```

###babel.config.js

为避免运行和打包时对export、module.exports混用出现的报错，在babel.config.js添加 plugins: []，即可不报错

###webpackConfig

如果你想快速查看基础的webpack.config配置，可以在cmd中写入vue inspect > outpot.js,回车查看output.js文件
