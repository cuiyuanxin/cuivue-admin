import axios from '@/libs/api.request'
import { BASE_URL } from '@/config/config' // 导入公共变量

// 获取验证码
export const getVerify = BASE_URL + '/admin/login/verify' + '?' + Math.random()

// 登录后台
export const login = (username, password, verify) => {
	const data = {
		username,
		password,
        verify
	}
	return axios.request({
		url: '/admin/login/login',
		data,
		method: 'post'
	})
}
