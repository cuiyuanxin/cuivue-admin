import { getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
	state: {
		username: '',
		userId: '',
		avatorImgPath: '../../../static/images/user2-160x160.jpg',
		token: getToken(),
		access: '',
		isTab: true
	},
	mutations: {
		setAvator (state, avatorPath) {
			state.avatorImgPath = avatorPath
		},
		setUserId (state, id) {
			state.userId = id
		},
		setUserName (state, name) {
			state.username = name
		},
		setAccess (state, access) {
			state.access = access
		},
		setIsTab (state, isTab) {
			state.isTab = isTab
		},
		// setToken (state, token) {
		// 	state.token = token
		// 	setToken(token)
		// }
	},
	actions: {
		// 获取用户相关信息
		getUserInfo({ state, commit }) {
			return new Promise((resolve, reject) => {
				getUserInfo().then(res => {
					const data = res.data
					commit('setUserName', data.username)
					commit('setUserId', data.id)
					commit('setIsTab', true)
					commit('setAccess', [])
					resolve(data)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}
