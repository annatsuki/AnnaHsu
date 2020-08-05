import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
// Loading
import Loading from 'vue-loading-overlay'// Import component
import 'vue-loading-overlay/dist/vue-loading.css'// Import stylesheet
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

// 元件 全域註冊
Vue.component('Loading', Loading)

// 套件加入到Vue的藍圖內
Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
