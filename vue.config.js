// cli_api配置地址 https://cli.vuejs.org/zh/config/
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

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
		resolve: {
			// 格式化地址前缀
			alias: {
				'api': '@/api'
			}
		},
		externals:{ // 在这里配置后，减少了压缩的包内容，需要在public/index.html通过cdn方式再引入,注意对应的版本
			vue: "Vue",
			vuex: "Vuex",
			axios: 'axios',
			"vue-router": "VueRouter",
			"element-ui": "ELEMENT"
		}
	},
	chainWebpack: config => {
		// #region 忽略cdn的文件,写入index.html
		const cdn = {
			css: [
				// element-ui css
				'//unpkg.com/element-ui/lib/theme-chalk/index.css'
			],
			js: [
				// vue
				'//cdn.staticfile.org/vue/2.5.22/vue.min.js',
				// vue-router
				'//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
				// vuex
				'//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
				// axios
				'//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
				// element-ui js
				'//unpkg.com/element-ui/lib/index.js'
			]
		}
		config.plugin('html')
			.tap(args => {
				args[0].cdn = cdn
				return args
			})
		// #endregion

		if (process.env.NODE_ENV === 'production') {
			// #region 图片压缩
			config.module
				.rule('images')
				.test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
				.use('img-loader')
				.loader('img-loader').options({
					plugins: [
						require('imagemin-jpegtran')(),
						require('imagemin-pngquant')({
							quality: [0.75, 0.85]
						})
					]
				})
			// #endregion

			// #region 启用GZip压缩
			config
				.plugin('compression')
				.use(CompressionPlugin, {
				  asset: '[path].gz[query]',
				  algorithm: 'gzip',
				  test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
				  threshold: 10240,
				  minRatio: 0.8,
				  cache: true
				})
				.tap(args => { })
			// #endregion
		}
	}
}