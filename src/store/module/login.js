import { getVerify, setLogin, isValidation, setlLogout } from '@/api/login'
import { setToken, getToken } from '@/libs/util'

export default {
	state: {
		username: '',
		userId: '',
		avatorImgPath: '',
		token: getToken(),
		access: '',
		isTab: true
	},
	mutations: {
		// setAvator (state, avatorPath) {
		// 	state.avatorImgPath = avatorPath
		// },
		// setUserId (state, id) {
		// 	state.userId = id
		// },
		// setUserName (state, name) {
		// 	state.username = name
		// },
		// setAccess (state, access) {
		// 	state.access = access
		// },
		// setIsTab (state, isTab) {
		// 	state.isTab = isTab
		// },
		setToken (state, token) {
			state.token = token
			setToken(token)
		}
	},
	actions: {
		// 登录
		handleLogin({ commit }, { username, password }) {
			return new Promise((resolve, reject) => {
				setLogin(
                    username,
					password
                ).then(res => {
					if (res.code === 0) {
						commit('setToken', res.data)
						resolve()
					}
				}).catch(err => {
					reject(err)
				})
			})
		},
		// 退出登录
		handleLogout({ state, commit }) {
			return new Promise((resolve, reject) => {
				setlLogout(state.token).then(() => {
					commit('setToken', '')
					commit('setAccess', [])
					resolve()
				}).catch(err => {
					reject(err)
				})
				// 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
				// commit('setToken', '')
				// commit('setAccess', [])
				// resolve()
			})
		}
	}
}
