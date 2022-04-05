import Vue from 'vue'
import ElemntUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/css/icon/iconfont.css'

//引入summernote
import 'summernote'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'summernote/dist/summernote.css'
// 语言包
import 'summernote/lang/summernote-zh-CN.js'


import './assets/css/mystyle.css'


Vue.use(ElemntUI)
Vue.config.productionTip = false
Vue.config.devtools = true
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
