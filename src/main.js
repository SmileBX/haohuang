import Vue from 'vue'
import App from './App'
import './css/common.css';

Vue.config.productionTip = false
App.mpType = 'app'

import store from './store/index'
//把store挂载到全局
Vue.prototype.$store = store;
const app = new Vue(App)
app.$mount()