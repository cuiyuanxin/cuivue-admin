// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // 导入vue核心
import App from './App' // 根模块
import router from './router' // 导入路由核心
import iView from 'iview' // 导入iview组件
import 'iview/dist/styles/iview.css' // 导入iview样式表
import '../static/css/CuiVueAdmin.css' // 导入自定义布局样式表
import '../static/css/skins.css' // 导入自定义布局颜色样式表
import locale from 'iview/dist/locale/zh-CN' // 导入国际化语言

Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示

Vue.use(iView, { locale })

/* eslint-disable no-new */
new Vue({
  	el: '#app',
  	router,
  	render: h => h(App)
})



// import VueRouter from 'vue-router'; // 导入vue-router路由核心
// import App from 'components/app.vue'; 
// import Routers from './router.js'; 
// Vue.use(VueRouter);


// The routing configuration
// const RouterConfig = {
//     routes: Routers
// };
// const router = new VueRouter(RouterConfig);

// new Vue({
//     el: '#app',
//     router: router,
//     render: h => h(App)
// });
