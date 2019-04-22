import Vue from 'vue'
import App from './App'
import './css/common.css'; //全局引入weui.css样式

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()