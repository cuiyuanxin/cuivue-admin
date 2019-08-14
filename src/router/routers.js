import Main from '@/components/main/main.vue'

export default [{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录',
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
			path: 'home',
			name: 'home',
			meta: {
				hideInMenu: true,
				title: '控制台',
				notCache: true,
				icon: 'home'
			},
			component: () => import('@/components/view/home/home.vue')
		}]
	},
	{
		path: '/system',
		name: 'system',
		component: Main,
		meta: {
			icon: 'setting',
			title: '系统管理'
		},
		children: [{
				path: 'user',
				name: 'userList',
				meta: {
					icon: 'user',
					title: '用户管理'
				},
				component: () => import('@/components/view/system/user/userList.vue')
			},
			// 		{
			// 			path: 'role',
			// 			name: 'role',
			// 			meta: {
			// 				icon: 'team',
			// 				title: '角色管理'
			// 			},
			// 			component: () => import('@/views/system/role')
			// 		},
			// 		{
			// 			path: 'dept',
			// 			name: 'dept',
			// 			meta: {
			// 				icon: 'solution',
			// 				title: '部门管理'
			// 			},
			// 			component: () => import('@/views/system/dept')
			// 		},
			// 		{
			// 			path: 'test',
			// 			name: 'test',
			// 			meta: {
			// 				icon: 'dashboard',
			// 				title: '测试页面'
			// 			},
			// 			component: () => import('@/views/test')
			// 		}
		]
	}
]
