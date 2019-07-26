// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // 导入vue核心
import App from './App' // 根模块
import router from './router' // 导入路由核心
import store from './store' // 导入vuex
import iView from 'iview' // 导入iview组件
// import '@/mock' // 导入模拟数据
import 'iview/dist/styles/iview.css' // 导入iview样式表
import '@/assets/icons/iconfont.css' // 导入icon样式表
import '../static/css/index.css' // 导入自定义布局样式表
import '../static/css/themes/purple.less' // 导入自定义布局颜色样式表
import locale from 'iview/dist/locale/zh-CN' // 导入国际化语言

Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示

Vue.use(iView, { locale })

/* eslint-disable no-new */
new Vue({
  	el: '#app',
	router,
	store,
  	render: h => h(App)
})