import Main from '@/components/main/main.vue'

export default [
    {
		path: '/login',
		name: 'login',
		meta: {
			title: 'Login - 登录',
			hideInMenu: true
		},
		component: () => import('@/components/view/login/login.vue')
	},
	{
		path: '/',
		redirect: {
            name: 'home'
        },
		component: Main,
		meta: {
			hideInMenu: true,
			notCache: true
		},
		children: [{
			path: '/home',
			name: 'home',
			meta: {
				hideInMenu: true,
				title: '首页',
				notCache: true,
				icon: 'home'
			},
			component: () => import('@/components/view/home/home.vue')
		}]
	}
]
