// cli_api配置地址 https://cli.vuejs.org/zh/config/
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
		}
	}
}