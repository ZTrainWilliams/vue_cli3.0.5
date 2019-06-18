import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './components/index.js'
// 自动注册components/global/下面的组件为全局组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
