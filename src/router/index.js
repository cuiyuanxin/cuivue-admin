import Vue from 'vue' // 导入vue核心
import Router from 'vue-router' // 导入vue-router路由核心
import routes from './routers' // 导入路由规则
import store from '../store' // 导入vuex
import iView from 'iview' // 导入iview组件
import {
	getToken,
	canTurnTo
} from '@/libs/util' // 工具方法

Vue.use(Router)

const router = new Router({
	routes,
	mode: 'history'
})

iView.LoadingBar.config({
	color: '#33ccff',
	failedColor: '#f0ad4e',
	height: 5
})

const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
	iView.LoadingBar.start()
	const token = getToken()
	if (!token && to.name !== LOGIN_PAGE_NAME) {
		// 未登录且要跳转的页面不是登录页
		next({
			name: LOGIN_PAGE_NAME // 跳转到登录页
		})
	} else if (!token && to.name === LOGIN_PAGE_NAME) {
		// 未登录且要跳转的页面是登录页
		next() // 跳转
	} else if (token && to.name === LOGIN_PAGE_NAME) {
		// 已登录且要跳转的页面是登录页
		next({
			name: 'home' // 跳转到home页
		})
	} else {
		// 	store.dispatch('getUserInfo').then(user => {
		//   	// 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
		//   		if (canTurnTo(to.name, user.access, routes)) next() // 有权限，可访问
		//   		else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
		// 	})
	}
})

router.afterEach(to => {
	iView.LoadingBar.finish()
	window.scrollTo(0, 0)
})

export default router
