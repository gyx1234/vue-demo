// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/iconfont/iconfont.css'
Vue.use(MintUI)

Vue.config.productionTip = false

import {post, get} from './utils/http'
// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$get = get

// import axios from 'axios'
// Vue.prototype.$ajax = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
