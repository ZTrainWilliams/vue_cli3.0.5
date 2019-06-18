// 扫描全局对象并自动注册组件
import Vue from 'vue'

// 自动加载 global 目录下的.js结尾文件
const componentsContext = require.context('./global', true, /.js$/)

componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  /**
  * 兼容 import export 和 require module.export
  */
  const ctrl = componentConfig.default || componentConfig
  Vue.component(ctrl.name, ctrl)
})
