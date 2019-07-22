import Vue from 'vue' // 导入vue核心
import Router from 'vue-router' // 导入vue-router路由核心
import routes from './routers' // 导入路由规则

Vue.use(Router)

const router = new Router({
  	routes,
  	mode: 'history'
})

export default router