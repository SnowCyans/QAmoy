import App from './App'

// #ifndef VUE3
import Vue from 'vue'

// 导入uView js库
import uView from "uview-ui";
Vue.use(uView);

// 导入时间格式处理包
import moment from 'moment'

// 挂载全局组件
import components from 'components/index.js'
Vue.use(components)

// 日期格式过滤器
Vue.filter('moment',function(val){
	return moment(val).format('YYYY-MM-DD')
})

Vue.config.productionTip = false
App.mpType = 'app'

import store from './store/index.js'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif